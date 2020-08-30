var db = require('./models');

db.sync({ force: true })
  .then(function () {
    db.models.Gig.create(
      {
        title: "Jay's favorite menu",
        technologies: 'Dinner',
        description: 'hand crafted to perfection',
        budget: 200,
        contact_email: 'g@gmail.com',
      },
      {
        include: [
          {
            association: [db.models.gig.subgig],
            include: [db.models.subgig.gig],
          },
        ],
      }
    ).then(function () {
      console.log('Did it!');
    });
  })
  .catch(function (err) {
    console.log(err);
  });
