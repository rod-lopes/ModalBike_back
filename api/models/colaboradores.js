"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class colaboradores extends Model {
    static associate(models) {
      colaboradores.hasMany(models.lancamentos, {
        foreignKey: "colaborador_id",
      }),
      colaboradores.hasMany(models.bicicletas, {
        foreignKey: "colaborador_id",
      }),
        colaboradores.belongsTo(models.niveis, {
          foreignKey: "nivel_id",
        });
    }
  }
  colaboradores.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      data_registro: DataTypes.DATEONLY,
      ativo: DataTypes.BOOLEAN,
      imagem_avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "colaboradores",
    }
  );
  return colaboradores;
};
