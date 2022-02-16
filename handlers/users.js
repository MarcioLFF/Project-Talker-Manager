const fs = require('fs/promises');

const fileName = 'talker.json';

module.exports = async (req, res, _next) => {
try {
const data = await fs.readFile(fileName);
const datajson = JSON.parse(data);
if (datajson.length === 0) {
return res.status(200).send(datajson);
}
  return res.status(200).send(datajson);
} catch (e) {
res.status(500).send({ message: 'erro na leitura do arquivo' });
}
};
