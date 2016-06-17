var gulp = require('gulp'),
    config = require('./config'),
    csscomb = require('gulp-csscomb'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

gulp.task('css', function() {
  console.log('---------- обработка css');
  return gulp.src(config.pathTo.Src.MainStyleFile)
    .pipe(autoprefixer(config.autoprefixerBrowsers))
    .pipe(csscomb())
    .pipe(gulp.dest(config.pathTo.Build.Styles))
    .pipe(reload({stream: true}));
});

gulp.task('vendorCss', function() {
  console.log('---------- копирование CSS');
  return gulp.src(config.pathTo.Src.CSSVendor)
    .pipe(gulp.dest(config.pathTo.Build.CSSVendor));
});