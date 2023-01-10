"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"niveis",
			[
				{
					nivel: "Colaborador",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nivel: "Administrador",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nivel: "Aguardando liberação",
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("niveis", null, {});
	},
};
