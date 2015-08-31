var gulp = require('gulp'),
    gutil = require('gulp-util'),
    
    jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    
    input = {
        'html': 'source/*.html',
        'sass': 'source/sass/**/*.scss',
        'javascript': 'source/javascript/**/*.js'
    },
    
    output = {
        'html':'dist',
        'stylesheets': 'dist/css',
        'javascript':'dist/js'
    };

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});


/* run javascript through jshint */

gulp.task('jshint', function(){
    return gulp.src(input.javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


/* concat javascript files, minify if --type production */
gulp.task('build-js', function(){
    return gulp.src(input.javascript)
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

/* compile scss files */
gulp.task('build-css', function() {
  return gulp.src(input.sass)
    .pipe(sourcemaps.init())
      .pipe(compass({
        css: 'dist/css',
        sass: 'source/sass'
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.stylesheets));
});


/* copy any html files to dist */
gulp.task('copy-html', function() {
  return gulp.src(input.html)
    .pipe(gulp.dest(output.html));
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', function() {
  gulp.watch(input.javascript, ['jshint', 'build-js']);
  gulp.watch(input.sass, ['build-css']);
  gulp.watch(input.html, ['copy-html']);
});