/**
 * TeamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // Create a new team
  create: async function (req, res) {
    try {
      // Create a new team with the data from the request body
      const newTeam = await Team.create(req.body).fetch();
      // Respond with the created team and HTTP status 201 (Created)
      return res.status(201).json(newTeam);
    } catch (err) {
      // Handle any errors during team creation
      return res.status(500).json({ error: 'Error creating team', details: err });
    }
  },

  // Retrieve a list of teams
  find: async function (req, res) {
    try {
      // Find all teams in the database
      const teams = await Team.find();
      // Respond with the list of teams and HTTP status 200 (OK)
      return res.status(200).json(teams);
    } catch (err) {
      // Handle any errors during fetching teams
      return res.status(500).json({ error: 'Error fetching teams', details: err });
    }
  },

  // Retrieve a specific team by ID
  findOne: async function (req, res) {
    try {
      // Find a team by the provided ID from the request parameters
      const team = await Team.findOne({ id: req.params.id });
      // If team not found, respond with HTTP status 404 (Not Found)
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      // Respond with the found team and HTTP status 200 (OK)
      return res.status(200).json(team);
    } catch (err) {
      // Handle any errors during fetching the team
      return res.status(500).json({ error: 'Error fetching team', details: err });
    }
  },

  // Update a team by ID
  update: async function (req, res) {
    try {
      // Update the team with the provided ID and request body data
      const updatedTeam = await Team.updateOne({ id: req.params.id }).set(req.body);
      // If team not found, respond with HTTP status 404 (Not Found)
      if (!updatedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }
      // Respond with the updated team and HTTP status 200 (OK)
      return res.status(200).json(updatedTeam);
    } catch (err) {
      // Handle any errors during updating the team
      return res.status(500).json({ error: 'Error updating team', details: err });
    }
  },

  // Delete a team by ID
  destroy: async function (req, res) {
    try {
      // Delete the team with the provided ID from the request parameters
      const deletedTeam = await Team.destroyOne({ id: req.params.id });
      // If team not found, respond with HTTP status 404 (Not Found)
      if (!deletedTeam) {
        return res.status(404).json({ error: 'Team not found' });
      }
      // Respond with HTTP status 204 (No Content) to indicate successful deletion
      return res.status(204).send();
    } catch (err) {
      // Handle any errors during deleting the team
      return res.status(500).json({ error: 'Error deleting team', details: err });
    }
  },
};


