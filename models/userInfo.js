const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const userInfo = sequelize.define(null, {
    username: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
    }
}, {
    tableName: "userInfo",
    timestamps: true
});

module.exports = userInfo;
