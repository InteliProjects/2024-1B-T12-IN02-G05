/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */

// Import necessary files and libraries
const controller = require('../../api/controllers/UserController'); // Import the UserController
const sinon = require('sinon'); // Import Sinon for stubbing and mocking
const assert = require('assert'); // Import assert for making assertions in tests
require('nyc'); // Import NYC for code coverage

// Describe block for grouping related tests for the UserController
describe('UserController', () => {

  // Test case for successful user registration
  it('Must register a user successfully', async () => {
    // Stub the User.create method to simulate successful user creation
    const userCreateStub = sinon.stub(User, 'create').resolves({ id: 1 });
    const studentCreateStub = sinon.stub(Student, 'create').resolves(true);
    const studentTeamCreateStub = sinon.stub(StudentTeam, 'create').resolves(true);
    // StudentTeam.create

    // Mock request object
    const req = {
      body: {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'Abc1@def',
        passwordConfirm: 'Abc1@def',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    // Mock response object with status and json methods
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    const expectedResponse = {
      message: 'Registration successful',
      student: true,
      studentTeam: true,
      user: {
        id: 1
      }
    };

    // Call the register method of the UserController
    await controller.register(req, res);

    // Assertions to verify the expected behavior
    assert.strictEqual(userCreateStub.calledOnce, true); // Verify the User.create method was called once
    assert.strictEqual(studentCreateStub.calledOnce, true); // Verify the Student.create method was called once
    assert.strictEqual(studentTeamCreateStub.calledOnce, true);
    assert.strictEqual(res.statusCode, 200); // Verify the response status code is 200
    assert.deepStrictEqual(res.body, expectedResponse);

    // Restore the original method
    userCreateStub.restore();
    studentCreateStub.restore();
    studentTeamCreateStub.restore();
  });

  // Test case for missing mandatory fields in the registration form
  it('Return error 400 if one of the mandatory fields is not filled in', async () => {
    // Mock request object with a missing 'name' field
    const req = {
      body: {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        passwordConfirm: 'password',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    // Mock response object with status and json methods
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    // Call the register method of the UserController
    await controller.register(req, res);

    // Assertions to verify the expected behavior
    assert.strictEqual(res.statusCode, 400); // Verify the response status code is 400
    assert.deepStrictEqual(res.body, { message: 'All required fields must be provided' }); // Verify the response body
  });

  // Repeated test case for missing mandatory fields in the registration form (missing 'username')
  it('Return error 400 if one of the mandatory fields is not filled in', async () => {
    const req = {
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'password',
        passwordConfirm: 'password',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    await controller.register(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: 'All required fields must be provided' });
  });

  // Repeated test case for missing mandatory fields in the registration form (missing 'email')
  it('Return error 400 if one of the mandatory fields is not filled in', async () => {
    const req = {
      body: {
        name: 'test',
        username: 'test',
        password: 'password',
        passwordConfirm: 'password',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    await controller.register(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: 'All required fields must be provided' });
  });

  // Repeated test case for missing mandatory fields in the registration form (missing 'password')
  it('Return error 400 if one of the mandatory fields is not filled in', async () => {
    const req = {
      body: {
        name: 'test', 
        username: 'test',
        email: 'test@test.com',
        passwordConfirm: 'password',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    await controller.register(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: 'All required fields must be provided' });
  });

  // Repeated test case for missing mandatory fields in the registration form (missing 'passwordConfirm')
  it('Return error 400 if one of the mandatory fields is not filled in', async () => {
    const req = {
      body: {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    await controller.register(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: 'All required fields must be provided' });
  });

  // Test case for password mismatch
  it('Return error 400 if the password do not match', async () => {
    const req = {
      body: {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'password1',
        passwordConfirm: 'password',
        nationality: 'TestCountry',
        city: 'TestCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    await controller.register(req, res);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: 'Passwords do not match' });
  });

  // Test case for email already exists
  it('Return error 400 if the email used already exists', async () => {
    // Stub the User.findOne method to simulate email already exists
    const databaseStub = sinon.stub(User, 'findOne').resolves({ email: 'test@test.com' });
    // Mock request object
    const req = {
      body: {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'Abc1@def',
        passwordConfirm: 'Abc1@def',
        nationality: 'testCountry',
        city: 'testCity',
        age: 18,
        gender: 'Male',
        phoneNumber: '1248502948',
        userType: 'Student',
        colorGroup: 'Red'
      }
    };

    // Mock response object with status and json methods
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
      }
    };

    // Call the register method of the UserController
    await controller.register(req, res);

    // Assertions to verify the expected behavior
    assert.strictEqual(databaseStub.calledOnce, true); // Verify the User.findOne method was called once
    assert.strictEqual(res.statusCode, 400); // Verify the response status code is 400
    assert.deepStrictEqual(res.body, { message: 'Email already exists' }); // Verify the response body

    // Restore the original method
    databaseStub.restore();
  });

});
