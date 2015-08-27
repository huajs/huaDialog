/**
 * Created by Administrator on 2015/8/27.
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * huadialog v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under the <%= pkg.license %> license\n' +
        ' */\n',
        less: {
            css: {
                options: {
                    paths: ["src"],
                    "banner": '<%= banner %>'
                },
                files: {
                    "dest/<%= pkg.name %>.css": "src/<%= pkg.name %>.less"
                }
            }
        },
        min: {
            'dist': {
                'options': {
                    'report': 'gzip'
                },
                'files': [{
                    'src': 'src/<%= pkg.name %>.js',
                    'dest': 'dest/<%= pkg.name %>.min.js'
                }]
            }
        },
        cssmin: {
            'dist': {
                'options': {
                    'report': false
                },
                'files': [{
                    'src': 'dest/<%= pkg.name %>.css',
                    'dest': 'dest/<%= pkg.name %>.min.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            core: {
                options: {
                    map: true
                },
                src: 'dest/<%= pkg.name %>.css'
            }
        },


        watch: {
            less: {
                files: ['src/<%= pkg.name %>.less'],
                tasks: ['less:css', 'autoprefixer:core', 'cssmin:dist']
            },
            js: {
                files: ['src/<%= pkg.name %>.js'],
                tasks: ['min:dist']
            }
        }


    });
    grunt.registerTask('default', ['watch']);

};