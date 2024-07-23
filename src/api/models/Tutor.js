// api/models/Tutor.js
module.exports = {
  attributes: {
    // Primary key
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    // Relationships
    user: {
      model: 'User',
      required: true
    },
    tutorTeams: {
      collection: 'TutorTeam',
      via: 'tutor'
    },
    country: {
      model: 'Country',
      columnName: 'id_country',
      required: true
    }
  }
};