module.exports = {
  // Function to handle form submission
  submit: async function (req, res) {
    // Logging session data for debugging purposes
    console.log('Session:', req.session);
    // Logging received request body data for verification
    console.log('Request Body:', req.body);

    // Destructuring question responses from request body
    const { q1, q2, q3, q4, q5, q6, q7 } = req.body;

    // Initializing variables to count scores for different types
    let directive = 0;
    let behavioral = 0;
    let analytical = 0;
    let conceptual = 0;

    // Incrementing scores based on responses to each question
    if (q1 === 'a') { analytical++; }
    if (q1 === 'b') { conceptual++; }

    if (q2 === 'a') { directive++; }
    if (q2 === 'b') { behavioral++; }

    if (q3 === 'a') { directive++; }
    if (q3 === 'b') { analytical++; }

    if (q4 === 'a') { analytical++; }
    if (q4 === 'b') { conceptual++; }

    if (q5 === 'a') { behavioral++; }
    if (q5 === 'b') { directive++; }

    if (q6 === 'a') { directive++; }
    if (q6 === 'b') { behavioral++; }

    if (q7 === 'a') { behavioral++; }
    if (q7 === 'b') { conceptual++; }

    // Finding the maximum score among different types
    const maxScore = Math.max(directive, behavioral, analytical, conceptual);
    let result;

    // Determining the personality type based on the maximum score
    if (maxScore === directive) { result = 'Directive'; }
    if (maxScore === behavioral) { result = 'Behavioral'; }
    if (maxScore === analytical) { result = 'Analytical'; }
    if (maxScore === conceptual) { result = 'Conceptual'; }

    try {
      // Assuming user ID is stored in the session
      const studentId = req.session.studentId;
      if (!studentId) {
        throw new Error('User ID is missing in session');
      }

      // Updating student's personality result in the database
      const updatedStudent = await Student.updateOne({ id: studentId }).set({ resultDm1: result });

      // If student is not found, return error response
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Return the result as JSON response
      return res.json({ result });
    } catch (error) {
      // Logging error for debugging
      console.error('Error while saving the result:', error);
      // Return error response if an error occurs during saving
      return res.status(500).json({ error: 'An error occurred while saving the result.' });
    }
  }
};
