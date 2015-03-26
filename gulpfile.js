var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('./src/main.js')
    .pipe(browserified)
    .pipe(gulp.dest('./dist/js'));
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
