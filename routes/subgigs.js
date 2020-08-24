const express = require('express');
const router = express.Router();
const SubGig = require('../models/SubGig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) =>
  SubGig.findAll()
    .then((subgigs) =>
      res.render('subgigs', {
        subgigs,
      })
    )
    .catch((err) => res.render('error', { error: err }))
);

// Display add gig form
router.get('/addsub', (req, res) => res.render('addsub'));

// Add a gig
router.post('/addsub', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('addsub', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    SubGig.create({
      title,
      technologies,
      description,
      budget,
      contact_email,
    })
      .then((subgig) => res.redirect('/subgigs'))
      .catch((err) => res.render('error', { error: err.message }));
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  SubGig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then((subgigs) => res.render('subgigs', { subgigs }))
    .catch((err) => res.render('error', { error: err }));
});

module.exports = router;
