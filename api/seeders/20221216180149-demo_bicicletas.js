'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {

		await queryInterface.bulkInsert('bicicletas', [
			{
				numero: 6858,
				colaborador_id: 2,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				numero: 6856,
				colaborador_id: 3,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				numero: 6860,
				colaborador_id: 4,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				numero: 6863,
				colaborador_id: 7,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				numero: 6864,
				colaborador_id: 6,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				numero: 6850,
				colaborador_id: 5,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				numero: 6855,
				colaborador_id: 1,
				status: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			
		], {});
	},

	async down(queryInterface, Sequelize) {

		await queryInterface.bulkDelete('bicicletas', null, {});
	}
};
