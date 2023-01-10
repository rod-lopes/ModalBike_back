"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("colaboradores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
      data_registro: {
        type: Sequelize.DATEONLY,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
      },
      nivel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "niveis", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("colaboradores");
  },
};
