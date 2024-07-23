/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */

// Import necessary libraries
const validatePassword = require('../../api/helpers/validate-password'); // Import the validatePassword
const sinon = require('sinon'); // Import Sinon for stubbing and mocking
const assert = require('assert'); // Import assert for making assertions in tests
require('nyc'); // Import NYC for code coverage

// Describe block for grouping related tests for the validatePassword helper
describe('validatePassword (helper)', () => {

  // Test case for a valid password
  it('Must pass with a valid password', async () => {
    const validPassword = 'Val1dPw';
    
    try {
      await validatePassword.fn({ password: validPassword }, { success: () => {}, invalid: () => {} });
      assert.ok(true); // If no error is thrown, the test passes
    } catch (err) {
      assert.fail('Expected helper to succeed');
    }
  });


  // Test case for a password missing a digit
  it('Must fail if the password is missing a digit', async () => {
    const invalidPassword = 'Val@idPw';
    
    try {
      await validatePassword.fn({ password: invalidPassword }, { success: () => {}, invalid: (err) => { throw err; } });
      assert.fail('Expected helper to fail');
    } catch (err) {
      assert.strictEqual(err.message, 'The password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long.');
    }
  });

  // Test case for a password missing an uppercase letter
  it('Must fail if the password is missing an uppercase letter', async () => {
    const invalidPassword = 'val1@dpw';
    
    try {
      await validatePassword.fn({ password: invalidPassword }, { success: () => {}, invalid: (err) => { throw err; } });
      assert.fail('Expected helper to fail');
    } catch (err) {
      assert.strictEqual(err.message, 'The password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long.');
    }
  });

  // Test case for a password missing a lowercase letter
  it('Must fail if the password is missing a lowercase letter', async () => {
    const invalidPassword = 'VAL1@DPW';
    
    try {
      await validatePassword.fn({ password: invalidPassword }, { success: () => {}, invalid: (err) => { throw err; } });
      assert.fail('Expected helper to fail');
    } catch (err) {
      assert.strictEqual(err.message, 'The password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long.');
    }
  });

  // Test case for a password too short
  it('Must fail if the password is too short', async () => {
    const invalidPassword = 'V1@dP';
    
    try {
      await validatePassword.fn({ password: invalidPassword }, { success: () => {}, invalid: (err) => { throw err; } });
      assert.fail('Expected helper to fail');
    } catch (err) {
      assert.strictEqual(err.message, 'The password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long.');
    }
  });
});
