/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/3/27.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename');
var js_src = 'js',
    css_src = 'css',
    js_dest = 'app/js',
    css_dest = 'app/css',
    font_dest = 'app/font';

gulp.task('default', ['js', 'css', 'font']);

gulp.task('clean', function () {
    gulp.src([
        js_dest + '/*.*',
        css_dest + '/*.*'
    ]).pipe(clean());
});

gulp.task('js', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery/dist/jquery.min.map',
        'node_modules/angular/angular.min.js',
        'node_modules/angular/angular.min.js.map',
        'node_modules/materialize-css/dist/js/materialize.min.js',
        'node_modules/underscore/underscore-min.js',
        'node_modules/underscore/underscore-min.map'
    ]).pipe(gulp.dest(js_dest));

    gulp.src([js_src + '/*.js'])
        .pipe(uglify({mangle: false}))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(js_dest));
});

gulp.task('css', function () {
    gulp.src([
        'node_modules/materialize-css/dist/css/materialize.min.css'
    ]).pipe(gulp.dest(css_dest));

    gulp.src([css_src + '/*.css'])
        .pipe(minify())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(css_dest));
});

gulp.task('font', function () {
    gulp.src([
        'node_modules/materialize-css/dist/font/**/*.*'
    ], {base: "node_modules/materialize-css/dist/font"})
        .pipe(gulp.dest(font_dest));
});