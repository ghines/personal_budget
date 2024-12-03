const express = require('express');
const router = express.Router();
const envelopes = require('../../Envelopes');

// retrieve all envelopes
router.get('/', (req, res) => {
    res.json(envelopes);
});

// retrieve single envelope
router.get('/:name', (req, res) => {   
    if (envelopes.some(envelope => envelope.name === req.params.name)) {
        res.json(envelopes.filter(envelope => envelope.name === req.params.name));
    } else {
        // 400 status = bad request
        res.status(400).json({msg: `Envelope ${req.params.name} does not exist`});
    }
});

// create envelope
router.post('/', (req, res) => {
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
});

// update envelope list
router.put('/:name', (req, res) => {
    if (envelopes.some(envelope => envelope.name === req.params.name)) {
        const updateEnvelope = req.body;
        envelopes.forEach(envelope => {
            if(envelope.name === req.params.name) {
                envelope.name = updateEnvelope ? updateEnvelope.name : envelope.name;
                res.json({msg: `Envelope updated`, envelope});
            }
        })
    } else {
        // 400 status = bad request
        res.status(400).json({msg: `Envelope ${req.params.name} does not exist`});
    }   
});

// delete envelope
router.delete('/:name', (req, res) => {
    if (envelopes.some(envelope => envelope.name === req.params.name)) {
        res.json({
            msg: `Envelope ${req.params.name} deleted`,
            envelopes: envelopes.filter(envelope => envelope.name !== req.params.name)
        });
    } else {
        // 400 status = bad request
        res.status(400).json({msg: `Envelope ${req.params.name} does not exist`});
    }   
});


module.exports = router;
