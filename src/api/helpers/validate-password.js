/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
module.exports = {

  friendlyName: 'Validate password',

  description: 'Validates whether the password meets the criteria: uppercase letter, lowercase letter, number and at least 8 characters.',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'The password to be validated.'
    }
  },

  exits: {
    success: {
      description: 'Password meets criteria.',
    },
    invalid: {
      description: 'Password does not meet criteria.',
    }
  },

  fn: async function (inputs, exits) {
    // Expressão regular para verificar os critérios da senha
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    
    // Verificar se a senha atende aos critérios
    if (regex.test(inputs.password)) {
      return exits.success();
    } else {
      return exits.invalid(new Error('The password must contain at least one uppercase letter, one lowercase letter, one number and be at least 8 characters long.'));
    }
  }

};
