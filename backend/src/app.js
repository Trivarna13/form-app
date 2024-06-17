const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("dotenv").config({
	path: path.resolve(__dirname, "../.env"),
});
const postgres = require("postgres");

const fs = require("fs").promises;
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, SPREADSHEET_ID } =
	process.env;

const sql = postgres({
	host: PGHOST,
	database: PGDATABASE,
	username: PGUSER,
	password: PGPASSWORD,
	port: 5432,
	ssl: "require",
	connection: {
		options: `project=${ENDPOINT_ID}`,
	},
});

// async function getPgVersion() {
// 	const result = await sql`select version()`;
// 	console.log(result);
// }

// getPgVersion();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
	try {
		const content = await fs.readFile(TOKEN_PATH);
		const credentials = JSON.parse(content);
		return google.auth.fromJSON(credentials);
	} catch (err) {
		return null;
	}
}

async function saveCredentials(client) {
	const content = await fs.readFile(CREDENTIALS_PATH);
	const keys = JSON.parse(content);
	const key = keys.installed || keys.web;
	const payload = JSON.stringify({
		type: "authorized_user",
		client_id: key.client_id,
		client_secret: key.client_secret,
		refresh_token: client.credentials.refresh_token,
	});
	await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
	let client = await loadSavedCredentialsIfExist();
	if (client) {
		return client;
	}
	client = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
	});
	if (client.credentials) {
		await saveCredentials(client);
	}
	return client;
}

async function syncData(req, res) {
	try {
		const query = `SELECT * FROM forms`;
		const results = await sql.unsafe(query);

		const rows = results.map((row) => [
			row.formtype,
			row.name,
			row.countrycode,
			row.phonenumber,
		]);
		const resource = {
			values: [
				["Form Type", "Name", "Country Code", "Phone Number"],
				...rows,
			],
		};

		const auth = await authorize();
		const sheets = google.sheets({ version: "v4", auth });

		await sheets.spreadsheets.values.update({
			spreadsheetId: SPREADSHEET_ID,
			range: "Sheet1!A1",
			valueInputOption: "RAW",
			resource,
		});

		res.status(200).send("Data synchronized with Google Sheets");
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {
	const { formType, name, countryCode, phoneNumber } = req.body;
	try {
		const query = `INSERT INTO forms (formType, name, countryCode, phoneNumber) VALUES ($1, $2, $3, $4)`;
		// console.log("SQL query:", query);
		await sql.unsafe(query, [formType, name, countryCode, phoneNumber]);
		res.status(200).json("Form Data Saved");
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

async function getFormData() {
	try {
		const result = `SELECT * FROM forms`;
		return result;
	} catch (error) {
		console.error("Error fetching Form Data:", error);
	}
}

app.get("/data", async (req, res) => {
	try {
		const data = await getFormData();
		res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching Form Data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/sync", syncData);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
