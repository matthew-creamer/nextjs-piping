'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const info = sequelize.define('info', {
    line_number: DataTypes.STRING,
    location: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    drawing_number: DataTypes.STRING,
    service: DataTypes.STRING,
    material: DataTypes.STRING,
    inservice_date: DataTypes.DATE,
    pipe_size: DataTypes.INTEGER,
    original_thickness: DataTypes.INTEGER,
    stress: DataTypes.INTEGER,
    joint_efficiency: DataTypes.INTEGER,
    ca: DataTypes.INTEGER,
    design_life: DataTypes.INTEGER,
    design_pressure: DataTypes.INTEGER,
    operating_pressure: DataTypes.INTEGER,
    design_temperature: DataTypes.INTEGER,
    operating_temperature: DataTypes.INTEGER
},
    {
        tableName: "info",
        freezeTableName: true,
        timestamps: false,
    });

module.exports = info;
