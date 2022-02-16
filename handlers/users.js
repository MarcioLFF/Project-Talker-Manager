const fs = require('fs/promises');

const fileName = 'talker.json';

module.exports = async (req, res, _next) => {
        const data = await fs.readFile(fileName);
        res.status(200).send(data);
      };
