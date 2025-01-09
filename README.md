# personal_budget

Personal budget project for Codecademy

## Description

This project is a simple personal budget management application built with Node.js and Express. It allows users to manage their budget by creating, updating, deleting, and transferring funds between different budget envelopes.

## Features

- Retrieve all budget envelopes
- Retrieve a single budget envelope by name
- Create a new budget envelope
- Update an existing budget envelope
- Delete a budget envelope
- Transfer funds between budget envelopes

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/personal_budget.git
    ```
2. Navigate to the project directory:
    ```sh
    cd personal_budget
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
    or for development with hot-reloading:
    ```sh
    npm run dev
    ```
2. The server will start on port 4000 by default. You can access the API at `http://localhost:4000/api/envelopes`.

## API Endpoints

- `GET /api/envelopes`: Retrieve all envelopes
- `GET /api/envelopes/:name`: Retrieve a single envelope by name
- `POST /api/envelopes`: Create a new envelope
- `PUT /api/envelopes/:name`: Update an existing envelope
- `DELETE /api/envelopes/:name`: Delete an envelope
- `PUT /api/envelopes/transfer/:amount`: Transfer funds between envelopes

## Example

To create a new envelope, send a POST request to `http://localhost:4000/api/envelopes` with the following JSON body:
```json
{
    "name": "Utilities",
    "allocatedAmount": 150,
    "spentAmount": 0
}

### Retrieve all envelopes
curl -X GET http://localhost:4000/api/envelopes

### Retrieve a single envelope by name
curl -X GET http://localhost:4000/api/envelopes/Utilities

### Create a new envelope
curl -X POST http://localhost:4000/api/envelopes -H "Content-Type: application/json" -d '{"name": "Utilities", "allocatedAmount": 150, "spentAmount": 0}'

### Update an existing envelope
curl -X PUT http://localhost:4000/api/envelopes/Utilities -H "Content-Type: application/json" -d '{"allocatedAmount": 200, "spentAmount": 50}'

### Delete an envelope
curl -X DELETE http://localhost:4000/api/envelopes/Utilities

### Transfer funds between envelopes
curl -X PUT http://localhost:4000/api/envelopes/transfer/50 -H "Content-Type: application/json" -d '{"fromAccount": "Groceries", "toAccount": "Utilities"}'

