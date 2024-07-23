// api/models/TutorTeam.js
module.exports = {
  attributes: {
    tutor: {
      model: 'Tutor'
    },
    team: {
      model: 'Team'
    }
  }
};