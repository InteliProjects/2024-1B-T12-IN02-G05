/* eslint-disable linebreak-style */
// api/models/StudentTeam.js
module.exports = {
  attributes: {
    colorGroup: {
      type: 'string',
      required: true
    },
    student: {
      model: 'student',
      required: true
    }
  }
};
