const fs = require('fs/promises');

const putTalker = async (req, res, _next) => {
const { id } = req.params;
const talkersJson = await fs.readFile('talker.json');
const talkers = JSON.parse(talkersJson);
const found = talkers.findIndex((talker) => talker.id === parseInt(id, 10)); // retorna o indice da posição que obedece a regra

const { name, age, talk: { watchedAt, rate } } = req.body;
const editedTalker = {
id: parseInt(id, 10),
name,
age,
talk: {
watchedAt,
rate,
},
};
talkers.splice(found, 1, editedTalker); // substitui na posição 'found', pelo novo talker
await fs.writeFile('talker.json', JSON.stringify(talkers));
return res.status(200).json(editedTalker);
};
module.exports = { putTalker };

// talkers.forEach((v, i) => {
// if (v.id === parseInt(id, 10)) {
// talkers[i].name = name;
// talkers[i].age = age;
// talkers[i].talk.watchedAt = watchedAt;
// talkers[i].talk.rate = rate;
// }
// });

// if (!found) {
// return res.status(401).send({ message: 'ID não encontrado' });
// }