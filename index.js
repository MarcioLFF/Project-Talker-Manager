const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const users = require('./handlers/users')

const fileName = 'talker.json'
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker',users)

