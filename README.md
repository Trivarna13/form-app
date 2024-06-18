# Form App

This project contains a simple form application that allows users to submit form data and synchronize it with an online Excel sheet (Google Sheets). The backend is built using Node.js, Express, and Neon Serverless Postgres for the database. The frontend is built with React and styled using Tailwind CSS.

## Table of Contents

- [Installation](https://github.com/Trivarna13/form-app/tree/master#installation)
- [Running the Application](https://github.com/Trivarna13/form-app/tree/master#running-the-application)
- [Functionality](https://github.com/Trivarna13/form-app/tree/master#functionality)

## Installation

### Prerequisites

Before you start, make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en) (v12 or higher)
- npm (v6 or higher)
**Note**: to download the latest version of npm, on the command line, run the following command:
`npm install -g npm`

### Steps

1. **Clone the Repository**
```
git clone https://github.com/yourusername/form-app.git
cd form-app
```

2. **Backend Setup**
Navigate to the backend directory and install the dependencies:
```
cd backend
npm install
```

3. **Frontend Setup**
Navigate to the frontend directory and install the dependencies:
```
cd ../frontend
npm install
```
4. **Environment Variables**
Create a .env file in the backend directory and add the following environment variables. Replace the placeholders with your actual database credentials and Google Sheets details:
```
PGHOST=your_neon_postgres_host
PGDATABASE=form_db
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
ENDPOINT_ID=your_neon_endpoint_id
SPREADSHEET_ID=your_google_sheets_id
```
5. **Google API Credentials**
Place your credentials.json file (downloaded from Google Cloud Console) in the backend/src directory. This file is required for authenticating with Google Sheets API.

## Running the Application

1. **Start the backend server**
```
cd backend/src
node app.js
```
This will start the server on http://localhost:5000.

2. **Start the frontend development server:**
Open a new terminal:
```
cd frontend
npm start
```
This will start the React development server on http://localhost:3000.

## Functionality

The application provides the following functionalities:

1.  **Interface:**
The application interface consists of a home page with:
- Two buttons to navigate to different forms: Form A and Form B, and
- A "Refresh" button to synchronize data with Google Sheets.

2. **Form Submission**:
- Users can fill out and submit forms. Each form consists of the following fields:
  - Name: Must contain only alphabetic characters.
  - Country Code: Selected from a dropdown list.
  - Phone Number: Must be numeric.

3. **Database**:
- Data submitted through the forms is stored in a PostgreSQL database (Neon Serverless Postgres).
- Each entry in the database includes:
  - **Form Type**: Indicates whether the entry is from Form A or Form B.
  - **Name**: Captures the name provided by the user.
  - **Country Code**: Stores the selected country code.
  - **Phone Number**: Records the phone number provided by the user.

4. **Data Synchronization:**
The application synchronizes form data with an online Excel sheet (Google Sheets). Key features include:
- **Refresh Button**: Available on the home page, triggers synchronization of data stored in the PostgreSQL database with the specified Google Sheets document.
- **Google Sheets API Integration**: Utilizes Google Sheets API for data updates and retrieval, ensuring real-time synchronization between the PostgreSQL database and Google Sheets.

5. **Local Storage**:
Form data is saved in the browser's local storage based on the form type, allowing users to retain their inputs even if they navigate away from the form.

## Links:
- Backend Hosting: [https://form-app-emgw.onrender.com/data](https://form-app-emgw.onrender.com/data)
- Frontend Hosting: [https://form-app-flame.vercel.app/](https://form-app-flame.vercel.app/)
- Google Sheets: [https://docs.google.com/spreadsheets/d/19YVX8-y-mCusWVsOpCfRqxx8Imu_9O0p9IImxOvRqLQ/edit?usp=sharing](https://docs.google.com/spreadsheets/d/19YVX8-y-mCusWVsOpCfRqxx8Imu_9O0p9IImxOvRqLQ/edit?usp=sharing)
