module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: '/* WebUploader <%= pkg.version %> */\n(function( window, undefined ) {\n',
                footer: '\n})( this );',
                separator: '\n\n',
                process: function( src, filepath ) {
                    return src.replace( /@version@/g, grunt.config.get('pkg.version') )
                            .replace( /^/gm, '    ');
                }
            },
            all: {
                src: [
                    'src/amd.js',
                    'src/jq-bridge.js',
                    'src/base.js',
                    'src/core/mediator.js',
                    'src/core/runtime.js',
                    'src/core/uploader.js',
                    'src/core/runtime/html5/runtime.js',
                    'src/core/runtime/html5/*.js',
                    '!src/exports.js',
                    'src/exports.js'
                ],

                dest: 'dist/webuploader.js'
            }
        },

        watch: {
            options: {
                debounceDelay: 250
            },

            doc: {
                files: ['src/**/*.js'],
                tasks: ['doc'],
            },

            concat: {
                files: ['src/**/*.js'],
                tasks: ['concat'],
            }
        },

        jsbint: {
            options: {
                jshintrc: '.jshintrc'
            },

            all: ['src/**/*.js', '!src/intro.js', '!src/outro.js']
        },

        size: {
            dist: {
                cwd: 'dist/',
                src: '*.js'
            },

            src: {
                cwd: 'src/',
                src: '/**/*.js'
            }
        }
    });

    // 加载build目录下的所有task
    // grunt.loadTasks( 'tasks' );

    // 负责合并代码
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    // 负责报告文件大小
    grunt.loadNpmTasks( 'grunt-size' );

    // 负责代码规范检测
    grunt.loadNpmTasks( 'grunt-jsbint' );

    // 负责监听文件变化
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // Default task(s).
    grunt.registerTask( 'default', [ 'jsbint', 'concat', 'size'] );
};