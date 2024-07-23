/**
 * Feedback.js
 *
 * @description :: Modelo para armazenar feedback entre estudantes.
 */

module.exports = {
  attributes: {
    results: {
      type: 'string',
      description: 'Resultados do feedback'
    },
    id_StudentReceiver: {
      model: 'Student',
      description: 'ID do estudante que recebe o feedback'
    },
    id_StudentSender: {
      model: 'Student',
      description: 'ID do estudante que envia o feedback'
    },
    questType: {
      type: 'string',
      description: 'Tipo de questionário'
    }
  }
};
