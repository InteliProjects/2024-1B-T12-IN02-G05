// api/models/University.js
module.exports = {
  attributes: {
    name: {
      type: 'string',
      allowNull: true
    },
    country: {
      model: 'Country',
    }
  }
};