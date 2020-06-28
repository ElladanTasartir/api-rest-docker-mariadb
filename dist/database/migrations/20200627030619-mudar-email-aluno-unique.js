"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("alunos", "email", {
      // Pega a coluna email de alunos e insere esse objeto de opções como as configurações da coluna
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: () => {},
};
