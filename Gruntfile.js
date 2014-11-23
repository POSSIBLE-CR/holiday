module.exports = function (grunt) {

  // Configurable paths
  var config = {
    app: 'public',
    dist: 'build'
  };

  var mainJsFiles = ['<%=config.app%>/js/base.js'];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: config,

    // Watch for changes on the CSS & JS files
    watch: {
      // SCSS files
      sass: {
        files: ['<%= config.app %>/scss/**/*.scss'],
        tasks: ['compass:main'],
        options: {
          spawn: false
        }
      },

      // Main JS files
      js: {
        files: ['<%= config.app %>/js/**/*.js','!<%=config.app%>/js/*.min.js'],
        tasks: ['jshint', 'uglify:main'],
        options: {
          spawn: false
        }
      }
    },

    // Runs compass on SCSS files
    compass : {
      main: {
        options: {
          config: 'config.rb'
        }
      },
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // Checks JS files
    jshint: {
      options : {
        reporter: 'jslint',
        force: 'true',
        reporter: require('jshint-stylish')
      },
      all: ['<%= config.app %>/js/**/*.js']
    },

    // Concats and minify files
    uglify: {
      main: {
        options: {
          beautify: true,
          banner: '/* Title Here <%= grunt.template.today("yyyy-mm-dd") %> */ \n'
        },
        files: {
          '<%= config.app %>/js/main.min.js': mainJsFiles,
        }
      },

      dist : {
        options: {
          beautify: false,
          banner: '/* Title Here <%= grunt.template.today("yyyy-mm-dd") %> */ \n'
        },
        files: {
          '<%= config.dist %>/js/main.min.js': mainJsFiles,
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'img/{,*/}*.webp',
            '{,*/}*.html',
            'fonts/{,*/}*.*',
            'css/{,*/}*.*',
            'js/libs/{,*/}*.*'
          ]
        }]
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['clean:dist', 'uglify:dist', 'copy:dist']);

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};