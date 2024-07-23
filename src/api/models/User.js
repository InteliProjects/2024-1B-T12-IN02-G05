/* eslint-disable linebreak-style */
// api/models/User.js
module.exports = {
  attributes: {
    age: {
      type: 'number',
      allowNull: true
    },
    phoneNumber: {
      type: 'string',
      allowNull: false
    },
    gender: {
      type: 'string',
      allowNull: true
    },
    nationality: {
      type: 'string',
      allowNull: true
    },
    email: {
      type: 'string',
      allowNull: true
    },
    name: {
      type: 'string',
      allowNull: true
    },
    password: {
      type: 'string',
      allowNull: true
    },
    userType: {
      type: 'string',
      allowNull: true
    },
    colorGroup: {
      type: 'string',
      allowNull: true
    },
}
}; 
