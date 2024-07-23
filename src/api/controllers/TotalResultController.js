// api/controllers/TotalResultController.js

module.exports = {
    async getTotalResult(req, res) {
        try {
            // Fetch student data from database
            const studentId = req.session.studentId; // Assuming you have the student ID in session
            const student = await Student.findOne({ id: studentId });

            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // Respond with total result data
            const totalResult = {
                resultDm1: student.resultDm1,
                resultDm2: student.resultDm2,
                resultDm3: student.resultDm3,
                // Add more results as needed
            };

            return res.json(totalResult);
        } catch (error) {
            console.error('Error while fetching total result:', error);
            return res.status(500).json({ error: 'Failed to fetch total result' });
        }
    },
};
