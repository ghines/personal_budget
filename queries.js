// const { get } = require("./routes/api/envelopes");

/* import pg from 'pg'
   const { Pool } = pg
OR */
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "budget",
  password: "2025",
  host: "localhost",
  database: "personalbudget",
});

const getEnvelopes = (req, res) => {
  pool.query("SELECT * FROM envelopes ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// retrieve single envelope
const getEnvelope = (req, res) => {
  pool.query(
    "SELECT * FROM envelopes WHERE name = $1",
    [req.params.name],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};

// create envelope
const createEnvelope = (req, res) => {
  pool.query(
    "INSERT INTO envelopes (name, balance) VALUES ($1, $2)",
    [req.body.name, req.body.balance],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Envelope ${req.body.name} added with ${req.body.balance}`);
    }
  );
};

// update envelope list
const updateEnvelope = (req, res) => {
  pool.query(
    "UPDATE envelopes SET name = $1 WHERE name = $2",
    [req.body.name, req.params.name],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Changed envelope ${req.params.name} to ${req.body.name}`);
    }
  );
};

// delete envelope
const deleteEnvelope = (req, res) => {
  pool.query(
    "DELETE FROM envelopes WHERE name = $1",
    [req.params.name],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Deleted envelope ${req.params.name}`);
    }
  );
};

// transfer from one envelope to another
//router.put("/transfer/:amount", (req, res) => {
const transfer = (req, res) => {
  // Parse and validate presence of amount, toAccount, and fromAccount
  const amount = Number(req.params.amount);
  if (!amount || isNaN(amount)) {
    return res.status(400).send("Invalid or missing amount parameter.");
  }

  // Check if req.body contains the expected data
  const { fromAccount, toAccount } = req.body;
  if (!fromAccount || !toAccount) {
    return res
      .status(400)
      .send("Missing 'fromAccount' or 'toAccount' in the request body.");
  }

  pool.query(
    "UPDATE envelopes SET balance = balance + $1 WHERE name = $2",
    [amount, toAccount],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Added ${amount} to ${toAccount}`);
    }
  );

  pool.query(
    "UPDATE envelopes SET balance = balance - $1 WHERE name = $2",
    [amount, fromAccount],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`${amount} from ${fromAccount} -> ${toAccount}`);
    }
  );
};

// Write out new endpoints in order to create, read, update, and delete new transactions.
// Create a new transaction
const createTransaction = (req, res) => {
    pool.query(
        "INSERT INTO transactions (date, amount, payee, envelope_id) VALUES ($1, $2, $3, $4) RETURNING id",
        [req.body.date, req.body.amount, req.body.payee, req.params.envelope_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          const transactionId = results.rows[0].id;

          pool.query(
            "UPDATE envelopes SET balance = balance - $1 WHERE id = $2",
            [req.body.amount, req.params.envelope_id],
            (error, results) => {
              if (error) {
                throw error;
              }
              res.status(201).send(`Transaction ${req.body.payee} for $${req.body.amount} added to envelope ${req.params.envelope_id}. Transaction ID: ${transactionId}. Subtracted ${req.body.amount} from envelope ${req.params.envelope_id}`);
            }
          );
         }
      );
  };

  // Read all transactions
  const getTransactions = (req, res) => {
    pool.query("SELECT * FROM transactions ORDER BY id ASC", (error, results) => {
        if (error) {
            res.status(500).send('Error executing query');
            return;
        }
        res.status(200).json(results.rows);
    });
};

    // Read a single transaction
    const getTransaction = (req, res) => {
        pool.query(
        "SELECT * FROM transactions WHERE id = $1",
        [req.params.id],
        (error, results) => {
            if (error) {
            throw error;
            }
            res.status(200).json(results.rows);
        });
    };

    // Update a transaction by ID, by deleting transaction and creating a new one
    const updateTransaction = (req, res) => {
        pool.query(
        "DELETE FROM transactions WHERE id = $1",
        [req.params.id],
        (error, results) => {
            if (error) {
            throw error;
            }
            pool.query(
            "INSERT INTO transactions (date, amount, payee, envelope_id) VALUES ($1, $2, $3, $4) RETURNING id",
            [req.body.date, req.body.amount, req.body.payee, req.body.envelope_id],
            (error, results) => {
                if (error) {
                throw error;
                }
                const transactionId = results.rows[0].id;
                res.status(201).send(`Deleted transaction with ID ${req.params.id}. Transaction ${transactionId} for $${req.body.amount} added to envelope ${req.body.envelope_id}`);
            }
            );
        }
        );
    };

    // Delete a transaction by ID
    const deleteTransaction = (req, res) => {
        pool.query(
        "DELETE FROM transactions WHERE id = $1",
        [req.params.id],
        (error, results) => {
            if (error) {
            throw error;
            }
            res.status(200).send(`Deleted transaction with ID ${req.params.id}`);
        }
        );
    };


  

module.exports = {
  getEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transfer,
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
