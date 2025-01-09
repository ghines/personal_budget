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

module.exports = {
    getEnvelopes
}