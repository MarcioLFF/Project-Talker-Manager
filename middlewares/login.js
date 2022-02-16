const crypto = require('crypto');

const checkEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/; // cria um formato padrão para o e-mail
  
    if (!email || email.length === 0) { // verifico se existe e-mail ou se está preenchido
      return res.status(400).send({
        message: 'O campo "email" é obrigatório',
      });
    }
    if (regex.test(email) === false) { // verifico se o formato do e-mail é válido
      return res.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    next();
  };
  
  const checkPassword = (req, res, next) => {
    const { password } = req.body; 
  
    if (!password || password.length === 0) { // verifico se existe ou se está preenchido o password
      return res.status(400).send({
        message: 'O campo "password" é obrigatório',
      });
    }
  
    if (password.length < 6) { // verifico se o password tem mais de 6 digitos
      return res.status(400).send({ 
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
    next();
  };

const createToken = (req, res, _next) => {
    const token = crypto.randomBytes(8).toString('hex'); // crio token de 16 caracteres
    res.status(200).send({ token: `${token}` });
};

module.exports = {
    checkEmail,
    checkPassword,
    createToken,
  }; 