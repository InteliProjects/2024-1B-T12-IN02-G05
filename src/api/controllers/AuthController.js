/* eslint-disable linebreak-style */
// api/controllers/AuthController.js
module.exports = {
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Find the student associated with the user
      const student = await Student.findOne({ user: user.id });

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Store the studentId in the session
      req.session.studentId = student.id;

      let route;
      if (user.userType === 'student') {
        route = '/homepage-student';
      } else {
        route = '';
      }

      // Redirects to main page with userId as parameter
      return res.status(200).json({
        message: 'Login successful',
        redirectUrl: route
      });

    } catch (err) {
      return res.status(500).json({ error: 'Error during login', details: err });
    }
  },
};
