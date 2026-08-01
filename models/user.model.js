"use strict";

module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("User", {
        name: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false}
    },
    {
        tableName: "Users",
        underscored: true
    });

    return User;
};
