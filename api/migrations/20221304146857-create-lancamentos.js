"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lancamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      km: {
        type: Sequelize.FLOAT,
      },
      tempo: {
        type: Sequelize.FLOAT,
      },
      colaborador_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "colaboradores", key: "id" },
      },
      bicicleta_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "bicicletas", key: "id" },
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
    await queryInterface.dropTable("lancamentos");
  },
};
