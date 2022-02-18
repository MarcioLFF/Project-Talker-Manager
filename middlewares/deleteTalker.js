const fs = require('fs/promises');

const deleteTalker = async (req, res, _next) => {
const { id } = req.params;
const talkersJson = await fs.readFile('talker.json');
const talkers = JSON.parse(talkersJson);
const found = talkers.findIndex((talker) => talker.id === parseInt(id, 10));

talkers.splice(found, 1); // substitui na posição 'found', pelo novo talker
await fs.writeFile('talker.json', JSON.stringify(talkers));
return res.status(204).end();
};

module.exports = { deleteTalker };