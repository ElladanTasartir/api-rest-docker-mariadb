"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("fotos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "alunos",
          key: "id",
        },
        // onDelete: 'CASCADE' // apaga todas as fotos do aluno referenciado
        onDelete: "SET NULL", // Vai setar o usuário para null,
        onUpdate: "CASCADE", // Se a primary key do registro pai for alterada, isso será refletido no registro filho
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("fotos");
  },
};
