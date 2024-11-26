const express = require('express');
const app = express();
const envelopes = require('./Envelopes.js');

// retrieve all employees
app.get('/api/envelopes', (req, res) => {
    res.json(envelopes);
})

// retrieve single employee
app.get('/api/envelopes/:name', (req, res) => {   
    if (envelopes.some(envelope => envelope.name === req.params.name)) {
        res.json(envelopes.filter(envelope => envelope.name === req.params.name));
    } else {
        // 400 status = bad request
        res.status(400).json({msg: `Envelope ${req.params.name} does not exist`});
    }
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
