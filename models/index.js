'use strict';
const info = require('../models/info');
const sequelize = require('./sequelize');

sequelize.sync().then(() => {
  console.log('Models have been synced with the database.');
});
