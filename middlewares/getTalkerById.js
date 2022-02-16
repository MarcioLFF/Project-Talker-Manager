const fs = require('fs/promises');

const fileName = 'talker.json';

module.exports = async (req, res) => {
const talker = await fs.readFile(fileName);
const talkerJson = JSON.parse(talker);

const { id } = req.params;
const foundTalkerById = talkerJson.find((v) => v.id === parseInt(id, 10));
if (!foundTalkerById) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
}
res.status(200).send(foundTalkerById);
};
