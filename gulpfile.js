var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var transform = require('vinyl-transform');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('browserify', function() {
  var bundler = browserify('./src/main.js')
    .transform(reactify);

  var bundle = function() {
    var b = transform(function(filename) {
      return bundler.bundle();
    });

    return gulp.src('./src/main.js')
      .pipe(b)
      .pipe(gulp.dest('./dist/js'));
  };

  return bundle();
});

gulp.task('copy', function() {
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('build', ['browserify', 'copy']);
