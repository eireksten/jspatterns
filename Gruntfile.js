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
    },
    handlebars: {
      options: {
        namespace: 'steria.templates',
        processName: function (filepath) {
          return filepath.substring(filepath.lastIndexOf('/') + 1, filepath.lastIndexOf('.'));
        }
      },
      build: {
        dest: "js/templates.js",
        src: [
          "templates/*.hbs"
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['jshint', 'handlebars']);

};