var gulp = require("gulp"),
    mjml = require('gulp-mjml'),
    mjmlEngine = require('mjml'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st');

gulp.task("mjml", function() {
  return gulp
    .src("./src/index.mjml")
    .pipe(mjml(mjmlEngine, {
      minify: true, 
      validationLevel: 'strict'
    }))
    .pipe(gulp.dest("./html"))
    .pipe(livereload());
});
gulp.task("assets", function() {
  return gulp
    .src("./src/assets/**")
    .pipe(gulp.dest("./html/assets"))
    .pipe(livereload());
});

gulp.task('server', function(done) {
  http.createServer(
    st({ 
      path: __dirname + '/html', 
      index: 'index.html', 
      cache: false,
    })
  ).listen(8080, done);
});

gulp.task('default', gulp.series('server', function() {
  livereload.listen({ basePath: 'html' });
  gulp.watch(['src/*.mjml'], gulp.series('mjml'))
  gulp.watch(['src/assets/**'], gulp.series('assets'))
}));
