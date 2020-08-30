const Sequelize = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gig', {
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

SubGig.belongsTo(Gig);
Gig.hasMany(SubGig, { as: 'subgigpartial' });

Gig.sync().then(() => {
  console.log('table created');
});
module.exports = Gig;

SubGig.sync().then(() => {
  console.log('table created');
});

module.exports = SubGig;
