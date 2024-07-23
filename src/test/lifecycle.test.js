/* eslint-disable linebreak-style */
var sails = require('sails'); // Import the Sails.js framework

before(function (done) {
  this.timeout(200000);   // Set a timeout of 10 seconds for the setup process

  sails.lift({}, // Lift (start) the Sails application with default configuration
    (err) => {
      if (err) {
        return done(err);
      }

      return done();
    }
  );
});

after((done) => { // After all tests have run, lower the Sails application
  sails.lower();
  return done();
});
