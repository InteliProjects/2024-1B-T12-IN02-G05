// api/models/Country.js
module.exports = {
  attributes: {
    // Primary key
    country: {
      type: 'string',
      allowNull: true
    },
    city: {
      type: 'string',
      allowNull: true
    },
    // Relationships
    students: {
      collection: 'Student',
      via: 'country'
    },
    universities: {
      collection: 'University',
      via: 'country'
    },
    tutors: {
      collection: 'Tutor',
      via: 'country'
    },
  },
};
