/* eslint-disable linebreak-style */
// api/models/Student.js
module.exports = {
  attributes: {
    instagram: {
      type: 'string',
    },
    facebook: {
      type: 'string',
    },
    linkedin: {
      type: 'string',
    },
    x: {
      type: 'string',
    },
    languages: {
      type: 'string',
      allowNull: true
    },
    interests: {
      type: 'string',
      allowNull: true
    },
    alias: {
      type: 'string',
      allowNull: true
    },
    university: {
      model: 'University',
    },
    country: {
      model: 'Country',
    },
    user: {
      model: 'User',
    },
    feedback: {
      model: 'Feedback',
    },
    happinessMeter: {
      type: 'number',
    },
    resultDm1: {
      type: 'string',
      allowNull: true
    },
    resultDm2: {
      type: 'string',
      allowNull: true
    },
    resultDm3: {
      type: 'string',
      allowNull: true
    },
    hobbies: {
      type: 'string',
      allowNull: true
    },
    bio: {
      type: 'string',
      allowNull: true
    },
    profile_photo: {
      type: 'string',
      allowNull: true,
    }
  }
};

