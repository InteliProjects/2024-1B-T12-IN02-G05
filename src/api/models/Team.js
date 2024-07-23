// api/models/Team.js
module.exports = {
  attributes: {
    color: {
      type: 'string',
      allowNull: true
    },
    universe: {
      type: 'number',
      allowNull: true
    },
    yearCesimGame: {
      model: 'CesimGameNew'
    },
    studentTeam: {
      model: 'StudentTeam'
    },
    tutorTeam: {
      model: 'TutorTeam'
    }
  }
};