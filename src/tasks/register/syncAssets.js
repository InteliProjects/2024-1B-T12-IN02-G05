/**
 * `tasks/register/syncAssets.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/sync-../WAD.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('syncAssets', [
    'less:dev',
    'sync:dev',
  ]);
};
