var gulp = require("gulp"),
    mjml = require('gulp-mjml'),
    mjmlEngine = require('mjml'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st'),
    browserSync = require('browser-sync').create();

gulp.task("mjml", function() {
  return gulp
    .src("./src/index.mjml")
    .pipe(mjml(mjmlEngine, {
      minify: true, 
      validationLevel: 'strict'
    }))
    .pipe(gulp.dest("./html"))
    .pipe(livereload())
    .pipe(browserSync.stream());
});
gulp.task("assets", function() {
  return gulp
    .src("./src/assets/**")
    .pipe(gulp.dest("./html/assets"))
    .pipe(livereload());
});

gulp.task('server', function(done) {
  browserSync.init({
    server: "./html"
  });
  gulp.watch(['src/assets/**'], gulp.series('assets'))
  gulp.watch(['src/*.mjml'], gulp.series('mjml')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('server'));
