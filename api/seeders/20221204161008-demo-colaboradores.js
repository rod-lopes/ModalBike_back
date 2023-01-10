"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"colaboradores",
			[
				{
					nome: "Rodrigo Basso Lopes",
					email: "rodrigo.lopes@modalgr.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nome: "Antônio dos Santos",
					email: "antonio@antonio.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nome: "Ana Maria",
					email: "ana@ana.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nome: "Carla Costa",
					email: "carla@carla.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nome: "Sabrina Silva",
					email: "sabrina@sabrina.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nome: "Vitor Soares",
					email: "vitor@vitor.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nome: "Cleber Souza",
					email: "cleber@cleber.com.br",
					senha: "$2b$10$V3pT0yRXSVtqj/PZp0501eT5wSIlQ9nUHyNkfApTDHzkg3msMcx0G",
					data_registro: "2012-12-04",
					ativo: true,
					nivel_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("colaboradores", null, {});
	},
};
