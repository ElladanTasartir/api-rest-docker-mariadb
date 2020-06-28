"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }

  const [, token] = authorization.split(" "); // separar o bearer do token utilizando um split no espaço
  // entre o 'bearer' e o token

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    // vai retornar o payload do token, ou seja, os dados do usuário
    const { id, email } = dados;

    // para confirmar se os ids e emails ainda são do mesmo usuário, caso ele tenha editado, ou algo do gênero
    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) return res.status(401).json({ errors: ["Usuário inválido"] });

    req.userId = id;
    req.userEmail = email;
    // aqui estamos atrelando esses dados à requisição
    return next();
  } catch (err) {
    return res.status(401).json({ errors: ["Token expirado ou inválido"] });
  }
};
