/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */

// Import of files and libraries used
const controller = require('../../api/controllers/StudentController'); // Import the StudentController
const sinon = require('sinon'); // Import Sinon for stubbing and mocking
const assert = require('assert'); // Import assert for making assertions in tests
require('nyc'); // Import NYC for code coverage

// Describe block for grouping related tests for StudentController
describe('StudentController', () => {

  // Nested describe block for grouping tests related to happinessMeter method
  describe('happinessMeter', () => {
    
    // Test to verify if it returns a 401 error if the user is not logged in
    it('Should return 401 if user is not logged in', async () => {
      const req = {
        session: {}, // Empty session indicating user is not logged in
        body: { happinessMeter: 5 } // Body with happinessMeter value
      };

      // Simulated res (response) object with status and json methods
      const res = {
        status: function(code) {
          this.statusCode = code; // Set the response status code
          return this;
        },
        json: function(data) {
          this.body = data; // Set the response body
        }
      };

      // Call the happinessMeter method of the StudentController
      await controller.happinessMeter(req, res);

      // Assertions to verify the expected behavior
      assert.strictEqual(res.statusCode, 401); // Verify the response status code is 401
      assert.deepStrictEqual(res.body, { error: 'User not logged in' }); // Verify the response body
    });

    // Test to verify if happinessMeter is updated and returns the updated value with group average
    it('Should update happinessMeter and return updated value with group average', async () => {
      const studentId = 1; // Student ID for the test
      const req = {
        session: { studentId }, // Session with logged in student ID
        body: { happinessMeter: 5 } // Body with happinessMeter value
      };

      // Simulated res (response) object with status and json methods
      const res = {
        status: function(code) {
          this.statusCode = code; // Set the response status code
          return this;
        },
        json: function(data) {
          this.body = data; // Set the response body
        }
      };

      // Stubbing Student update method to simulate database update
      const studentStub = sinon.stub(Student, 'update').returns({
        set: sinon.stub().returns({
          fetch: sinon.stub().resolves([{ id: studentId, happinessMeter: 5 }]) // Mocking the fetch result
        })
      });

      // Stubbing StudentTeam find method to simulate team lookup
      const studentTeamStub = sinon.stub(StudentTeam, 'find');
      studentTeamStub.onFirstCall().resolves([{ team: 1 }]); // First call resolves team
      studentTeamStub.onSecondCall().resolves([{ student: 2 }, { student: 3 }]); // Second call resolves team members

      // Stubbing Student find method to simulate lookup for team members
      const studentFindStub = sinon.stub(Student, 'find').resolves([
        { id: 2, happinessMeter: 4 }, // Team member 1
        { id: 3, happinessMeter: 6 } // Team member 2
      ]);

      // Call the happinessMeter method of the StudentController
      await controller.happinessMeter(req, res);

      // Assertions to verify the expected behavior
      assert.strictEqual(res.statusCode, 200); // Verify the response status code is 200
      assert.deepStrictEqual(res.body, {
        happinessMeter: 5, // Updated happinessMeter
        averageHappinessMeter: 5 // Calculated average happinessMeter
      });

      // Restore the original methods
      studentStub.restore();
      studentTeamStub.restore();
      studentFindStub.restore();
    });

    // Test to handle internal server error
    it('Should handle internal server error', async () => {
      const studentId = 1; // Student ID for the test
      const req = {
        session: { studentId }, // Session with logged in student ID
        body: { happinessMeter: 5 } // Body with happinessMeter value
      };

      // Simulated res (response) object with status and json methods
      const res = {
        status: function(code) {
          this.statusCode = code; // Set the response status code
          return this;
        },
        json: function(data) {
          this.body = data; // Set the response body
        }
      };

      // Stubbing Student update method to simulate a database error
      sinon.stub(Student, 'update').throws(new Error('Database error'));

      // Call the happinessMeter method of the StudentController
      await controller.happinessMeter(req, res);

      // Assertions to verify the expected behavior
      assert.strictEqual(res.statusCode, 500); // Verify the response status code is 500
      assert.deepStrictEqual(res.body, { error: 'Internal server error' }); // Verify the response body

      // Restore the original method
      Student.update.restore();
    });
  });

  // Nested describe block for grouping tests related to checkResult method
  describe('checkResult', () => {
    
    // Test to verify if it returns true if the student result exists
    it('Should return true if student result exists', async () => {
      const studentId = 1; // Student ID for the test
      const req = {
        session: { studentId } // Session with logged in student ID
      };

      // Simulated res (response) object with json method
      const res = {
        json: function(data) {
          this.body = data; // Set the response body
        }
      };

      // Stubbing Student findOne method to simulate database lookup
      sinon.stub(Student, 'findOne').resolves({ id: studentId, result: 'Some Result' });

      // Call the checkResult method of the StudentController
      await controller.checkResult(req, res);

      // Assertions to verify the expected behavior
      assert.deepStrictEqual(res.body, { exists: true }); // Verify the response body

      // Restore the original method
      Student.findOne.restore();
    });

    // Test to verify if it returns false if the student result does not exist
    it('Should return false if student result does not exist', async () => {
      const studentId = 1; // Student ID for the test
      const req = {
        session: { studentId } // Session with logged in student ID
      };

      // Simulated res (response) object with json method
      const res = {
        json: function(data) {
          this.body = data; // Set the response body
        }
      };

      // Stubbing Student findOne method to simulate database lookup
      sinon.stub(Student, 'findOne').resolves({ id: studentId });

      // Call the checkResult method of the StudentController
      await controller.checkResult(req, res);

      // Assertions to verify the expected behavior
      assert.deepStrictEqual(res.body, { exists: false }); // Verify the response body

      // Restore the original method
      Student.findOne.restore();
    });

    // Test to handle internal server error
    it('Should handle internal server error', async () => {
      const studentId = 1; // Student ID for the test
      const req = {
        session: { studentId } // Session with logged in student ID
      };

      // Simulated res (response) object with serverError method
      const res = {
        serverError: function(error) {
          this.error = error; // Set the response error
        }
      };

      // Stubbing Student findOne method to simulate a database error
      sinon.stub(Student, 'findOne').throws(new Error('Database error'));

      // Call the checkResult method of the StudentController
      await controller.checkResult(req, res);

      // Assertions to verify the expected behavior
      assert.strictEqual(res.error.message, 'Database error'); // Verify the error message

      // Restore the original method
      Student.findOne.restore();
    });
  });
});
