require('dotenv').config();
const express = require('express');
const path = require('path');
const thesaurus = require('./thesaurus.js');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;

console.log(thesaurus);
thesaurus.getPunnableWords('umpire', 'noun')
  .then((punnableWords) => {
    console.log(punnableWords);
  });

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
