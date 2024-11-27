const express = require('express');
const app = express();
const envelopes = require('./Envelopes.js');

app.use(express.json());

// setting up the routes
app.use('/api/envelopes', require('./routes/api/envelopes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
