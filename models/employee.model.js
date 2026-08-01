"use strict";

module.exports = (Sequelize, DataTypes) => {
    const Employee = Sequelize.define("Employee", {
        name: DataTypes.STRING,
        hireDate: { type: DataTypes.DATE, field: "hire_date" },
        positionId: { type: DataTypes.INTEGER, field: "position_id" }
    },
    {
        tableName: "Employees",
        underscored: true
    });

    Employee.associate = function (models) {
        Employee.belongsTo(models.Position, { foreignKey: "positionId" });
    };

    return Employee;
};
