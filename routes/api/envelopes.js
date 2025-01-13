const express = require('express');
const router = express.Router();
const envelopes = require('../../Envelopes');
const db = require('../../queries');

// retrieve all envelopesnod
router.get('/', db.getEnvelopes);

// retrieve single envelope
router.get('/:name', db.getEnvelope);

// create envelope
router.post('/', db.createEnvelope);

// update envelope list
router.put('/:name', db.updateEnvelope);

// delete envelope
router.delete('/:name', db.deleteEnvelope);

// transfer from one envelope to another
router.put('/transfer/:amount', db.transfer);

// create transaction
router.post('/transaction/:envelope_id', db.createTransaction);

// get all transactions
router.get('/transactions/all', db.getTransactions);

// get a single transaction by id   
router.get('/transaction/:id', db.getTransaction);

// update transaction (deletes and inserts new transaction)
router.put('/transaction/update/:id', db.updateTransaction);

// delete transaction   
router.delete('/transaction/delete/:id', db.deleteTransaction);


module.exports = router;
