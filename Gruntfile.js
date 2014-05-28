module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 4,
        noempty: true,
        undef: true,
        unused: true,
        strict: true,
        browser: true,
        devel: true,
        predef: ['Zepto', 'jQuery', '$', '_'],
        ignores: ['js/templates.js']
      },
      src: ['js/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

};