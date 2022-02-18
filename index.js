const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./middlewares/getTalkers');
const talkerId = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const postTalker = require('./middlewares/postTalker');
const putTalker = require('./middlewares/putTalker');
const validations = require('./middlewares/validacoes');
const { deleteTalker } = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', talker);
app.get('/talker/:id', talkerId);
app.post('/login', login.checkEmail, login.checkPassword, login.createToken);
app.post('/talker', validations.checkToken, validations.checkName, validations.checkAge, 
validations.checkTalk, validations.checkWatchedAt, postTalker.addTalker);
app.put('/talker/:id', validations.checkToken, validations.checkName, validations.checkAge, 
validations.checkTalk, validations.checkWatchedAt, putTalker.putTalker);
app.delete('/talker/:id', validations.checkToken, deleteTalker);