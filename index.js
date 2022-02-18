const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./middlewares/getTalkers');
const talkerId = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const postTalker = require('./middlewares/postTalker');
const putsome = require('./middlewares/putTalker');

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
app.post('/talker', postTalker.checkToken, postTalker.checkName, postTalker.checkAge, 
postTalker.checkTalk, postTalker.checkWatchedAt, postTalker.addTalker);
app.put('/talker/:id', postTalker.checkToken, postTalker.checkName, postTalker.checkAge, 
postTalker.checkTalk, postTalker.checkWatchedAt, putsome.putTalker);