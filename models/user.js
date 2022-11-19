const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const users = sequelize.define(null, {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
    }
}, {
    tableName: "users",
    timestamps: true
});

module.exports = users;
