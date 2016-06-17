var gulp = require('gulp'),
    config = require('./config');

gulp.task('html', function() {
  console.log('---------- копирование html');
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});