"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "lancamentos",
      [
        {
          km: 10.5,
          tempo: 0.5,
          colaborador_id: 1,
          bicicleta_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 20.5,
          tempo: 1.5,
          colaborador_id: 1,
          bicicleta_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 15,
          tempo: 1,
          colaborador_id: 2,
          bicicleta_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 20.5,
          tempo: 1.8,
          colaborador_id: 3,
          bicicleta_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 8,
          tempo: 0.3,
          colaborador_id: 4,
          bicicleta_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 1,
          tempo: 0.2,
          colaborador_id: 5,
          bicicleta_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 18,
          tempo: 0.5,
          colaborador_id: 6,
          bicicleta_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 30,
          tempo: 1.5,
          colaborador_id: 6,
          bicicleta_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 2,
          tempo: 0.2,
          colaborador_id: 7,
          bicicleta_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          km: 22,
          tempo: 1,
          colaborador_id: 7,
          bicicleta_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lancamentos", null, {});
  },
};
