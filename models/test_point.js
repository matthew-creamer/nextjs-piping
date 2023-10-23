'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const test_point = sequelize.define('test_point', {
    line_number: DataTypes.STRING,
    cml_number: DataTypes.INTEGER,
    tp_number: DataTypes.INTEGER,
    tp_description: DataTypes.INTEGER,
    note: DataTypes.STRING
},
    {
        tableName: "test_point",
        freezeTableName: true,
        timestamps: false,
    });

module.exports = test_point;