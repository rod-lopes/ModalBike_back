"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class lancamentos extends Model {
    static associate(models) {
      lancamentos.belongsTo(models.colaboradores, {
        foreignKey: "colaborador_id",
      });
      lancamentos.belongsTo(models.bicicletas, {
        foreignKey: "bicicleta_id",
      });
    }
  }
  lancamentos.init(
    {
      km: DataTypes.FLOAT,
      tempo: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "lancamentos",
    }
  );
  return lancamentos;
};
