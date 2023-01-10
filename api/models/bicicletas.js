'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bicicletas extends Model {
    static associate(models) {
      bicicletas.belongsTo(models.colaboradores, {
        foreignKey: "colaborador_id",
      });
      bicicletas.hasMany(models.lancamentos, {
        foreignKey: "bicicleta_id",
      })
    }
  }
  bicicletas.init({
    numero: DataTypes.INTEGER,
    colaborador_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'bicicletas',
  });
  return bicicletas;
};