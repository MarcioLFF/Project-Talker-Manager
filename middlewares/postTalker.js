const fs = require('fs');

const checkToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).send({ message: 'Token inválido' });
    }
    next();
};
const checkName = (req, res, next) => {
    const { name } = req.body;
    if (!name || !name.length) {
        return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    
    next();
};

const checkAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    }
    if (parseInt(age, 10) < 18) {
        return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const checkTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
        return res.status(400).send({
             message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
};

const checkWatchedAt = (req, res, next) => {
    const { talk: { watchedAt, rate } } = req.body;
    const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if ([1, 2, 3, 4, 5].includes(rate) === false) {
        return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (regexData.test(watchedAt) === false) {
        return res.status(400).send({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });  
    }
    next();
};

const addTalker = (req, res, _next) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const getTalkers = fs.readFileSync('talker.json');
    const getTalkersJson = JSON.parse(getTalkers);
    const newTalker = {
        name,
        id: getTalkersJson.length + 1,
        age,
        talk: {
            watchedAt,
            rate,
        },
    };
    getTalkersJson.push(newTalker);
    fs.writeFileSync('talker.json', JSON.stringify(getTalkersJson));
    return res.status(201).json(newTalker);
};

module.exports = { checkAge, checkName, checkTalk, checkToken, checkWatchedAt, addTalker };