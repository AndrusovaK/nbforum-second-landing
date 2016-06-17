/* SVG sprite */
var gulp = require('gulp'),
    config = require('./config'),
    svg2png = require('gulp-svg2png'),
    imagemin = require('gulp-imagemin'),
    svgspritesheet = require('gulp-svg-spritesheet'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');
    svgmin = require('gulp-svgmin');
    cheerio = require('gulp-cheerio');
    svgstore = require('gulp-svgstore');

// gulp.task('svg-sprite', function () {
//     gulp.src(config.pathTo.Src.SvgSprite)
//         .pipe(plumber(function(error) {
//             gutil.log(gutil.colors.red(error.message));
//             this.emit('end');
//         }))
//         .pipe(newer(config.pathTo.Build.SvgSprite))
//         .pipe(svgspritesheet({
//             cssPathNoSvg: '../svg/sprite/svg-sprite.png',
//             cssPathSvg: '../svg/sprite/svg-sprite.svg',
//             padding: 1,
//             pixelBase: 16,
//             positioning: 'packed',
//             templateSrc: config.pathTo.Src.SvgSpriteTpl,
//             templateDest: config.pathTo.Build.SvgSpriteCSS,
//             units: 'rem'
//         }))
//         .pipe(imagemin({
//             multipass: true,
//             optimizationLevel: 7
//         }))
//         .pipe(gulp.dest(config.pathTo.Build.SvgSprite))
//         .pipe(svg2png())
//         .pipe(gulp.dest(config.pathTo.Build.SvgSpriteNoSvg))
//         .pipe(reload({stream: true}));
// });

gulp.task('svg-sprite', function () {
  console.log('---------- сборка SVG спрайта');
  return gulp.src(config.pathTo.Src.SvgSprite)
    .pipe(svgmin(function (file) {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(cheerio(function ($) {
      $('svg').attr('style',  'display:none');
     }))
    .pipe(cheerio(function ($) {
       $('svg').children('defs').remove();
       }))
    .pipe(gulp.dest(config.pathTo.Build.SvgSprite));
});