const express = require('express');
const app = express();
const employees = require('./Employees');

app.get('/api/employees', (req, res) => {
    res.json(employees);
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
