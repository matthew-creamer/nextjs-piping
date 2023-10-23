'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const cml = sequelize.define('cml', {
    line_number: DataTypes.STRING,
    cml_number: DataTypes.INTEGER,
    cml_description: DataTypes.STRING,
    actual_outside_diameter: DataTypes.INTEGER,
    design_thickness: DataTypes.INTEGER,
    structural_thickness: DataTypes.INTEGER,
    required_thickness: DataTypes.INTEGER
},
    {
        tableName: "cml",
        freezeTableName: true,
        timestamps: false,
    });

module.exports = cml;
