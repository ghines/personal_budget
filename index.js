const express = require('express');
const app = express();
const envelopes = require('./Envelopes.js');

app.use(express.json());

// retrieve all envelopes
app.get('/api/envelopes', (req, res) => {
    res.json(envelopes);
})

// retrieve single envelope
app.get('/api/envelopes/:name', (req, res) => {   
    if (envelopes.some(envelope => envelope.name === req.params.name)) {
        res.json(envelopes.filter(envelope => envelope.name === req.params.name));
    } else {
        // 400 status = bad request
        res.status(400).json({msg: `Envelope ${req.params.name} does not exist`});
    }
})

// create envelope
app.post('/api/envelopes', (req, res) => {
    const newEnvelope = {
        name: req.body.name,
        allocatedAmount: req.body.allocatedAmount,
        spentAmount: req.body.spentAmount,
    }

    if (!newEnvelope.name || !newEnvelope.allocatedAmount) {
        res.status(400).json({msg: 'Please include both name and allocated amount'});
    }

    envelopes.push(newEnvelope);
    res.json(envelopes);
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
