/* eslint-disable linebreak-style */ // Disable ESLint rule for linebreak style
module.exports = {
  // Function to handle user registration
  register: async function (req, res) {
    try {
      // Extract required fields from the request body
      const {
        name,
        username,
        email,
        password,
        passwordConfirm,
        nationality,
        city,
        age,
        gender,
        phoneNumber,
        userType,
        colorGroup
      } = req.body;

      // Check if any required field is missing
      if (!name || !username || !email || !password || !passwordConfirm || !colorGroup) {
        return res.status(400).json({
          message: 'All required fields must be provided' // Respond with an error if any field is missing
        });
      }

      // Validate if passwords match
      if (password !== passwordConfirm) {
        return res.status(400).json({
          message: 'Passwords do not match' // Respond with an error if passwords do not match
        });
      }

      // Validate the password using the helper
      try {
        await sails.helpers.validatePassword.with({ password });
      } catch (err) {
        return res.status(400).json({
          message: err.message // Respond with an error if password does not meet criteria
        });
      }

      // Check if the email is already in use
      const userWithEmail = await User.findOne({ email });
      if (userWithEmail) {
        return res.status(400).json({
          message: 'Email already exists' // Respond with an error if email already exists
        });
      } else {
        // Create a new user
        const newUser = await User.create({
          name,
          username,
          email,
          password,
          nationality,
          city,
          age,
          gender,
          phoneNumber,
          userType,
          colorGroup
        }).fetch();

        console.log('New User Created:', newUser);

        // Create a new student linked to the new user
        const newStudent = await Student.create({
          user: newUser.id,
          alias: '',
          languages: '',
          interests: '',
          hobbies: '',
          bio: '',
          instagram: '',
          facebook: '',
          linkedin: '',
          x: ''
        }).fetch();

        console.log('New Student Created:', newStudent);

        // Log the data to be used for creating StudentTeam
        console.log('Data for StudentTeam Creation:', {
          colorGroup: newUser.colorGroup,
          student: newStudent.id
        });

        // Create a new student team linked to the new student
        const newStudentTeam = await StudentTeam.create({
          colorGroup: newUser.colorGroup,
          student: newStudent.id
        });

        console.log('New Student Team Created:', newStudentTeam);

        return res.status(200).json({
          message: 'Registration successful', // Respond with success message
          user: newUser, // Include user details in the response
          student: newStudent, // Include student details in the response
          studentTeam: newStudentTeam // Include student team details in the response
        });
      }

    } catch (err) {
      // Handle any errors that occur during registration
      console.error('Error during registration:', err);
      return res.status(500).json({
        message: 'Error registering user', // Respond with a general error message
        error: err.message // Include the specific error message
      });
    }
  },

  findOne: async function (req, res) {
    try {
      const userId = req.params.id;

      // Fetch user information
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Fetch information of the associated student
      const student = await Student.findOne({ user: userId });
      if (!student) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
      }

      // Combine user and student information into an object
      const userProfile = {
        user: user,
        student: student
      };

      return res.status(200).json(userProfile);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor', details: error });
    }
  },

  loadUserProfile: async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ id: userId });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Render the profile page with user data
      return res.view('pages/group-profile', { user });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar perfil do usuário', details: error });
    }
  },
  logout: async function(req, res) {
    try {
      if (!req.session.me) {
        return res.status(401).json({ error: 'User is not logged' });
      }

      // Clear the user session
      req.session.me = null;

      // Respond with a success message or redirect to the home page
      if (req.wantsJSON) {
        return res.ok('Logout successful!');
      } else {
        return res.redirect('/');
      }
    } catch (error) {
      console.error('Error when loggin out:', error);
      return res.status(500).json({ error: 'Intern error, try again' });
    }
  }
};
