/**
 * `tasks/register/linkAssetsBuildProd.js`
 *
 * ---------------------------------------------------------------
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/register/link-../WAD-build-prod.js
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('linkAssetsBuildProd', [
    'sails-linker:prodJsBuild',
    'sails-linker:prodStylesBuild',
  ]);
};
