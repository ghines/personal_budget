/* import pg from 'pg'
   const { Pool } = pg
OR */
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'budget',
    password: '2025',
    host: 'localhost',
    database: 'personalbudget'
})

const getEnvelopes = (req, res) => {
    pool.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// retrieve single envelope
router.getEnvelope('/:name', (req, res) => {
    pool.query('SELECT * FROM envelopes WHERE name = $1', [req.params.name], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

// create envelope
router.post('/', (req, res) => {
    pool.query('INSERT INTO envelopes (name, allocatedAmount, spentAmount) VALUES ($1, $2, $3)', [req.body.name, req.body.allocatedAmount, req.body.spentAmount], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Envelope added with ID: ${result.insertId}`)
    })
});


// update envelope list
router.put('/:name', (req, res) => {
    pool.query('UPDATE envelopes SET name = $1 WHERE name = $2', [req.body.name, req.params.name], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Envelope modified with ID: ${id}`)
    }) 
});

// delete envelope
router.delete('/:name', (req, res) => {
    pool.query('DELETE FROM envelopes WHERE name = $1', [req.params.name], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Envelope deleted with ID: ${id}`)
    })
});

// transfer from one envelope to another
router.put('/transfer/:amount', (req, res) => {
    // Parse and validate presence of amount, toAccount, and fromAccount
    const amount = Number(req.params.amount);
    if (!amount || isNaN(amount)) {
        return res.status(400).send("Invalid or missing amount parameter.");
    }

    // Check if req.body contains the expected data
    const { fromAccount, toAccount } = req.body;
    if (!fromAccount || !toAccount) {
        return res.status(400).send("Missing 'fromAccount' or 'toAccount' in the request body.");
    }

    const fromAccountIndex = envelopes.findIndex(envelope => envelope.name === fromAccount);
    const toAccountIndex = envelopes.findIndex(envelope => envelope.name === toAccount);

    envelopes[fromAccountIndex].allocatedAmount -= amount;
    envelopes[toAccountIndex].allocatedAmount += amount;

    res.send(`${amount} from ${fromAccount} -> ${toAccount}`);

});

module.exports = {
    getEnvelopes
}