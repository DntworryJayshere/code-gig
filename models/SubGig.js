const Sequelize = require('sequelize');
const db = require('../config/database');

const SubGig = db.define('subgig', {
  title: {
    type: Sequelize.STRING,
  },
  technologies: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.STRING,
  },
  contact_email: {
    type: Sequelize.STRING,
  },
});

SubGig.sync().then(() => {
  console.log('table created');
});

module.exports = SubGig;
