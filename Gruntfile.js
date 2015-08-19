module.exports = function (grunt) {
    'use strict';

    var expandFiles = function (glob) {
        return grunt.file.expand({
            filter: 'isFile'
        }, glob);
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            all: {
                files: ['src/**/*.js', 'tests/**/*.js'],
                tasks: ['test']
            },
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
            }
        },

        jasmine_nodejs: {
            all: {
                specs: ['tests/**'],
            },
        },

        browserify: {
            options: {
                browserifyOptions: {
                    debug: true,
                },
            },

            testSources: {
                src: [ 'src/**/*.js', ],
                dest: 'dist/test_sources.js',
                options: {
                    require: expandFiles([ './src/**/*.js', ])
                }
            },

            test: {
                src: [
                    'tests/**/*.js',
                ],
                dest: 'dist/test_bundle.js',
                options: {
                    external: ['src/**/*.js'],
                }
            },

            dist: {
                src: [
                    'src/**/*.js',
                ],
                dest: 'dist/pro-singulis.js',
                options: {
                    standalone: true,
                }
            },
        },

        jasmine: {
            coverage: {
                src: ['src/**/*.js'],

                options: {
                    keepRunner: true,
                    specs: 'tests/**/*.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        template: require('grunt-template-jasmine-nml'),
                        templateOptions: {
                            sourceRoot: '.grunt/grunt-contrib-jasmine/',
                        },
                        coverage: 'reports/coverage/coverage.json',
                        report: 'reports/coverage',
                        thresholds: {
                            lines: 85,
                            statements: 85,
                            branches: 80,
                            functions: 90
                        },
                    }
                },
            },
        },

        clean: {
            dist: ['dist/*'],
        },

        uglify: {
            dist: {
                files: {
                    'dist/pro-singulis.min.js': ['dist/pro-singulis.js']
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    grunt.registerTask('test', ['jshint', 'jasmine_nodejs', 'jasmine']);
    grunt.registerTask('dist', ['clean', 'browserify:dist', 'uglify:dist']);
};
