/* eslint-disable linebreak-style */
/**
 * RoundController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // Create a new round
  create: async function (req, res) {
    try {
      // Create a new round with the data from the request body
      const newRound = await Rounds.create(req.body).fetch();
      // Respond with the created round and HTTP status 201 (Created)
      return res.status(201).json(newRound);
    } catch (err) {
      // Handle any errors during round creation
      return res.status(500).json({ error: 'Error creating round', details: err });
    }
  },

  // Retrieve a list of rounds
  find: async function (req, res) {
    try {
      // Find all rounds in the database
      const rounds = await Rounds.find();
      // Respond with the list of rounds and HTTP status 200 (OK)
      return res.status(200).json(rounds);
    } catch (err) {
      // Handle any errors during fetching rounds
      return res.status(500).json({ error: 'Error fetching rounds', details: err });
    }
  },

  // Retrieve a specific round by ID
  findOne: async function (req, res) {
    try {
      // Find a round by the provided ID from the request parameters
      const round = await Rounds.findOne({ id: req.params.id });
      // If round not found, respond with HTTP status 404 (Not Found)
      if (!round) {
        return res.status(404).json({ error: 'Round not found' });
      }
      // Respond with the found round and HTTP status 200 (OK)
      return res.status(200).json(round);
    } catch (err) {
      // Handle any errors during fetching the round
      return res.status(500).json({ error: 'Error fetching round', details: err });
    }
  },

  // Update a round by ID
  update: async function (req, res) {
    try {
      // Update the round with the provided ID and request body data
      const updatedRound = await Rounds.updateOne({ id: req.params.id }).set(req.body);
      // If round not found, respond with HTTP status 404 (Not Found)
      if (!updatedRound) {
        return res.status(404).json({ error: 'Round not found' });
      }
      // Respond with the updated round and HTTP status 200 (OK)
      return res.status(200).json(updatedRound);
    } catch (err) {
      // Handle any errors during updating the round
      return res.status(500).json({ error: 'Error updating round', details: err });
    }
  },

  // Delete a round by ID
  destroy: async function (req, res) {
    try {
      // Delete the round with the provided ID from the request parameters
      const deletedRound = await Rounds.destroyOne({ id: req.params.id });
      // If round not found, respond with HTTP status 404 (Not Found)
      if (!deletedRound) {
        return res.status(404).json({ error: 'Round not found' });
      }
      // Respond with HTTP status 204 (No Content) to indicate successful deletion
      return res.status(204).send();
    } catch (err) {
      // Handle any errors during deleting the round
      return res.status(500).json({ error: 'Error deleting round', details: err });
    }
  },
};


