/* eslint-disable linebreak-style */
module.exports = {
  findMembers: async function (req, res) {
    try {
      const studentId = req.session.studentId;

      // Check if the user is logged in
      if (!studentId) {
        return res.status(401).json({ error: 'User not logged in' });
      }

      // Find the student's teams
      const studentTeams = await StudentTeam.find({ student: studentId });

      // Extract the team colors from the student's teams
      const teamColors = studentTeams.map(st => st.colorGroup);

      // Find the members of the same teams, except the student themselves
      const teamMembers = await StudentTeam.find({
        where: {
          colorGroup: { 'in': teamColors },
          student: { '!=': studentId }
        }
      });

      // Extract the IDs of the group members
      const memberIds = teamMembers.map(tm => tm.student);

      // Fetch the group members from the Student table with associated user names
      const membersWithNames = [];
      for (const memberId of memberIds) {
        const student = await Student.findOne({ id: memberId }).populate('user');
        if (student && student.user) {
          membersWithNames.push({
            userId: student.user.id,
            name: student.user.name,
            studentId: student.id
            // Here you can include more fields if necessary

          });
        }
      }

      return res.status(200).json(membersWithNames);
    } catch (error) {
      console.error('Erro ao buscar membros do grupo:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Function to update the student's "happiness meter"
  happinessMeter: async function(req, res) {
    try {
      const studentId = req.session.studentId;

      // Check if the user is logged in
      if (!studentId) {
        return res.status(401).json({ error: 'User not logged in' });
      }

      const { happinessMeter } = req.body;

      // Update the student's "happiness meter"
      const studentUpdated = await Student.update({ id: studentId }).set({ happinessMeter }).fetch();

      // Find the student's teams
      let studentTeams = await StudentTeam.find({ student: studentId });
      let teamColor = studentTeams.map(st => st.colorGroup);
      let teamMembers = await StudentTeam.find({ colorGroup: teamColor });

      // Extract student IDs from the teams
      let membersIds = teamMembers.map(tm => tm.student);
      let members = await Student.find({ id: membersIds });

      // Extract "happiness meters" from the students
      let happinessMeters = members.map(s => s.happinessMeter);
      let happinessMeterGroup = 0;

      // Calculate the total "happiness meter" of the group
      for (let i = 0; i < happinessMeters.length; i++) {
        happinessMeterGroup += happinessMeters[i];
      }

      // Calculate the average "happiness meter" of the group
      let averageHappinessMeter = happinessMeterGroup / happinessMeters.length;

      // Return the updated "happiness meter" and the group average
      return res.status(200).json({
        happinessMeter: happinessMeter,
        averageHappinessMeter: averageHappinessMeter
      });

    } catch (error) {
      console.error('Erro ao atualizar o happiness meter do estudante:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Function to check if the student's result exists
  checkResult: async function (req, res) {
    try {
      const studentId = req.session.studentId;
      const student = await Student.findOne({ id: studentId });

      // Verificar se o estudante e o resultado existem
      if (student && student.result) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    } catch (error) {
      return res.serverError(error);
    }
  },

  // Function to update student information
  update: async function (req, res) {
    const studentId = req.session.studentId;
    const { alias, languages, interests, hobbies, bio, instagram, facebook, x, linkedin, profile_photo } = req.body;

    sails.log({ studentId, alias, languages, interests, hobbies, bio, instagram, facebook, linkedin, x, profile_photo});

    try {
      // Update student information
      const updatedStudent = await Student.updateOne({ id: studentId }).set({
        alias, languages, interests, hobbies, bio, instagram, facebook, linkedin, x, profile_photo
      });

      sails.log(updatedStudent);

      // Check if the student was found and updated
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Estudante não encontrado' });
      }

      // Return the updated student information
      return res.status(200).json(updatedStudent);
    } catch (err) {
      sails.log(err);
      return res.status(500).json({ error: 'Erro ao atualizar estudante', details: err });
    }
  },

  // New action to fetch user profile data
  getProfile: async function(req, res) {
    try {
      const studentId = req.session.studentId;

      // Check if the user is logged in
      if (!studentId) {
        return res.status(401).json({ error: 'Usuário não logado' });
      }

      // Fetch student data, including user data
      const student = await Student.findOne({ id: studentId }).populate('user');

      // Check if the student was found
      if (!student) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Extract the user name from the User table
      const userName = student.user.name;

      // Build the profile object with the student data and the user name
      const profile = {
        name: userName,
        alias: student.alias,
        languages: student.languages,
        interests: student.interests,
        instagram: student.instagram,
        linkedin: student.linkedin,
        facebook: student.facebook,
        x: student.x,
        hobbies: student.hobbies,
        bio: student.bio,
        photo: student.profile_photo
      };

      return res.status(200).json(profile);

    } catch (error) {
      console.error('Erro ao obter perfil do usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  loadUserProfile: async function (req, res) {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.view('profile', { user });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  uploadProfilePhoto: async function(req, res) {
    try {
      const studentId = req.session.studentId;

      // Check if the student is logged in
      if (!studentId) {
        return res.status(401).json({ error: 'Usuário não logado' });
      }

      // Use the helper to upload the profile photo
      const profile_photo = await sails.helpers.upload.with({
        req: req,
        fieldName: 'profile_photo',
      });

      // Update the student's profile_photo field
      const updatedStudent = await Student.updateOne({ id: studentId }).set({
        profile_photo: profile_photo
      });

      // Check if the student was found and updated
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Estudante não encontrado' });
      }

      // Return the updated profile photo URL
      return res.status(200).json({ profile_photo: profile_photo });
    } catch (error) {
      console.error('Erro ao fazer upload da foto de perfil:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

};
