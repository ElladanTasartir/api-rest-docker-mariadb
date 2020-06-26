import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }

  const [, token] = authorization.split(" "); // separar o bearer do token utilizando um split no espaço
  // entre o 'bearer' e o token

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    // vai retornar o payload do token, ou seja, os dados do usuário
    const { id, email } = dados;

    // para confirmar se os ids e emails ainda são do mesmo usuário, caso ele tenha editado, ou algo do gênero
    const user = await User.findOne({
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
