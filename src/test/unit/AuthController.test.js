/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */

// Import of files and libraries used
const controller = require('../../api/controllers/AuthController'); // Import the AuthController
const sinon = require('sinon'); // Import Sinon for stubbing and mocking
const assert = require('assert'); // Import assert for making assertions in tests
require('nyc'); // Import NYC for code coverage

// Describe block for grouping related tests for AuthController
describe('AuthController', () => {

  // Test to verify if it returns a 401 error if email or password are invalid
  it('Return error 401 if email or password are invalid', async () => {
    // Stub to simulate the database lookup, resolves with a user having email 'testLogin@test.com'
    const databaseStub = sinon.stub(User, 'findOne').resolves({ email: 'testLogin@test.com' });
    
    // Simulated req (request) object with email and password
    const req = {
      body: {
        email: 'testLogin1@test.com', // Incorrect email
        password: 'passwordLogin', // Password
      }
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
    
    // Call the login method of the AuthController
    await controller.login(req, res);
    
    // Assertions to verify the expected behavior
    assert.strictEqual(databaseStub.calledOnce, true); // Verify the database lookup was called once
    assert.strictEqual(res.statusCode, 401); // Verify the response status code is 401
    assert.deepStrictEqual(res.body, { error: 'Invalid email or password' }); // Verify the response body
    
    databaseStub.restore(); // Restore the original method
  });

  // Another test to verify if it returns a 401 error if email or password are invalid
  it('Return error 401 if email or password are invalid', async () => {
    // Stub to simulate the database lookup, resolves with a user having password 'passwordLogin1'
    const databaseStub = sinon.stub(User, 'findOne').resolves({ password: 'passwordLogin1' });
    
    // Simulated req (request) object with email and password
    const req = {
      body: {
        email: 'testLogin1@test.com', // Email
        password: 'passwordLogin', // Incorrect password
      }
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
    
    // Call the login method of the AuthController
    await controller.login(req, res);
    
    // Assertions to verify the expected behavior
    assert.strictEqual(databaseStub.calledOnce, true); // Verify the database lookup was called once
    assert.strictEqual(res.statusCode, 401); // Verify the response status code is 401
    assert.deepStrictEqual(res.body, { error: 'Invalid email or password' }); // Verify the response body
    
    databaseStub.restore(); // Restore the original method
  });

});
