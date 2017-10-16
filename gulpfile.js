'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
prefixer = require('gulp-autoprefixer'),
browserSync = require("browser-sync"),
watch = require('gulp-watch'),
    reload = browserSync.reload;

var path= {
	dist : 'dist/css',
	src : 'src/**/*.scss',
	watch:'src/**/*.scss'

}
gulp.task('watch', function(){
    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    watch([path.watch], function(event, cb) {
        gulp.start('style');
    });

});
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('style', function () {
    gulp.src(path.src) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['watch']);

gulp.task('default', ['style', 'browser-sync'], function () {
    gulp.watch(path.watch, ['style']);
});