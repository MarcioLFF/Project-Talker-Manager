const fs = require('fs');

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

module.exports = { addTalker };