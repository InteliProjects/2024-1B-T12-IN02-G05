// api/models/Round.js
module.exports = {
  attributes: {
    startDate: {
      type: 'number',
      allowNull: true
    },
    endDate: {
      type: 'number',
      allowNull: true
    },
    roundNumber: {
      type: 'number',
      allowNull: true
    },
    yearCesimGame: {
      model: 'CesimGameNew',
    }
  }
};