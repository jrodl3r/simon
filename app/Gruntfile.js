/*global module, require*/

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    sass: {
      dist: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          'css/core.css': 'css/core.scss'
        }
      }
    },


    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: false,
        browser: true,
        globals: {
          "$": false,
          "jQuery": false,
          "Modernizr": false,
          "console": false,
          "window": true,
          "debug": true,
          "log": true,
          "Breakpoints": true
        }
      },
      files: ['Gruntfile.js', 'js/*.js']
    },


    watch: {
      sass: {
        files: ['css/**/*.scss'],
        tasks: ['sass:dist']
      },
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint']
      },
      options: {
        livereload: true
      }
    }

  });


  // Load Modules
  // ----------------------------------------------------------
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Register Tasks
  // ----------------------------------------------------------
  grunt.registerTask('default', ['sass:dist', 'jshint', 'watch']);


  // Show Timer
  // ----------------------------------------------------------
  require('time-grunt')(grunt);

};
