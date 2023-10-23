'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const thickness = sequelize.define('thickness', {
    line_number: DataTypes.STRING,
    cml_number: DataTypes.INTEGER,
    tp_number: DataTypes.INTEGER,
    inspection_date: DataTypes.DATE,
    actual_thickness: DataTypes.INTEGER
},
    {
        tableName: "thickness",
        freezeTableName: true,
        timestamps: false,
    });

module.exports = thickness;
