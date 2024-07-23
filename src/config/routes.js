/* eslint-disable linebreak-style */
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `../WAD` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // Home page and authentication
  '/': { view: 'pages/login' },
  'GET /login': { view: 'pages/login' },
  'POST /login': 'AuthController.login',
  '/register-user': { view: 'pages/register-user' },
  'POST /register-user': 'UserController.register',

  // Student profile and related routes
  '/homepage-student': { view: 'pages/homepage' },
  '/myprofile': { view: 'pages/myprofile' },
  'GET /getProfile': 'StudentController.getProfile',
  'PUT /update-profile': 'StudentController.update',
  'GET /student/checkResult': 'StudentController.checkResult',
  'POST /happinessMeter': 'StudentController.happinessMeter',
  'POST /create-student': 'StudentController.create',
  'GET /sideBarGroup': 'StudentController.findMembers',

  // Tutor panel and group profile
  '/painel-tutor': { view: 'pages/painel-tutor' },
  '/totalresults': { view: 'pages/totalresults' },
  '/group-profile': { view: 'pages/group-profile' },
  'GET /group-profile/:id': 'UserController.loadUserProfile',

  // Questionnaires and results
  '/questionnaireDm1': { view: 'pages/questionnaireDm1' },
  'POST /questionnaireDm1Results': 'QuestionnarieDm1ResultsController.submit',
  'GET /resultDm1': { view: 'pages/resultDm1' },
  '/questionnaireDm2': { view: 'pages/questionnaireDm2' },
  'POST /questionnaireDm2Results': 'QuestionnarieDm2ResultsController.submit',
  'GET /resultDm2': { view: 'pages/resultDm2' },
  '/questionnaireDm3': { view: 'pages/questionnaireDm3' },
  'POST /questionnaireDm3Results': 'QuestionnarieDm3ResultsController.submit',
  'GET /resultDm3': { view: 'pages/resultDm3' },

  // Total results API
  'GET /api/totalresult': { controller: 'TotalResultController', action: 'getTotalResult' },

  // API routes for various controllers
  'GET /user/:id': 'UserController.findOne',
  'GET /user': 'UserController.find',
  'PUT /user/:id': 'UserController.update',
  'DELETE /user/:id': 'UserController.destroy',
  
  'POST /student/uploadProfilePhoto': 'StudentController.uploadProfilePhoto',


  
  
  'POST /studentteam': 'StudentTeamController.create',
  'GET /studentteam/:id': 'StudentTeamController.findOne',
  'GET /studentteam': 'StudentTeamController.find',
  'PUT /studentteam/:id': 'StudentTeamController.update',
  'DELETE /studentteam/:id': 'StudentTeamController.destroy',
  
  
  'GET /student/:id': 'StudentController.findOne',
  'GET /student': 'StudentController.find',
  'PUT /student/:id': 'StudentController.update',
  'DELETE /student/:id': 'StudentController.destroy',




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static ../WAD.             *
  *                                                                          *
  ***************************************************************************/
};
