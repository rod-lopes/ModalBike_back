"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class niveis extends Model {
    static associate(models) {
      niveis.hasMany(models.colaboradores, {
        foreignKey: "nivel_id",
      });
    }
  }
  niveis.init(
    {
      nivel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "niveis",
    }
  );
  return niveis;
};
