const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
);

app.listen(PORT, () => {
  console.log(`Server app listening on port: ${PORT}!`);
});
