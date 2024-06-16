const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("dotenv").config({
	path: path.resolve(__dirname, "../.env"),
});
const postgres = require("postgres");
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
