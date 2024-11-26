const express = require('express');
const app = express();
const employees = require('./Employees');

// retrieve all employees
app.get('/api/employees', (req, res) => {
    res.json(employees);
})

// retrieve single employee
app.get('/api/employees/:name', (req, res) => {
    res.json(employees.filter(employee => employee.name === req.params.name));
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
