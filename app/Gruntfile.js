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
        esnext: true,
        globalstrict: true,
        globals: {
          "console": false,
          "window": true,
          "debug": true,
          "log": true,
        }
      },
      files: ['Gruntfile.js', 'js/core.js']
    },


    jasmine: {
      pivotal: {
        src: 'js/dist.js',
        options: {
          specs: 'js/spec/*Spec.js',
          keepRunner: true
        }
      }
    },

    traceur: {
      options: {
        script: true,
        'experimental': true,
        'blockBinding': true,
        'includeRuntime': true
      },
      custom: {
        files: {
          'js/dist.js': ['js/core.js']
        }
      }
    },


    watch: {
      sass: {
        files: ['css/**/*.scss'],
        tasks: ['sass:dist']
      },
      js: {
        files: ['Gruntfile.js', 'js/**/*.js'],
        tasks: ['jshint', 'jasmine']
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
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-traceur');


  // Register Tasks
  // ----------------------------------------------------------
  grunt.registerTask('default', ['sass:dist', 'jshint', 'watch']);


  // Show Timer
  // ----------------------------------------------------------
  require('time-grunt')(grunt);

};
