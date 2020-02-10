const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const reservationsRouter = require('./routes/reservations');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve the homepage from here
app.use(express.static('public'));

// handle api calls from here
app.use('/reservations', reservationsRouter);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});
