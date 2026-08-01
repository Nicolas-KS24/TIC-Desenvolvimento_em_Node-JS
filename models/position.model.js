"use strict";

module.exports = (Sequelize, DataTypes) => {
    const Position = Sequelize.define("Position", {
        title: DataTypes.STRING,
        salary: DataTypes.FLOAT,
    },
        {
        tableName: "Positions",
        underscored: true
    });

    Position.associate = function (models) {
        Position.hasMany(models.Employee, { foreignKey: "positionId" });
    };

    return Position;
};
