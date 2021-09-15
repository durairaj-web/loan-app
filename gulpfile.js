let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
  return gulp.src('src/assets/css/*.css')
    .pipe(cleanCSS({ debug: true }, (details) => {
      console.log(
        '\x1b[36m%s\x1b[31m%s\x1b[33m%s\x1b[0m',
        `${details.name}: ${details.stats.originalSize}`, ` ==> `, `${details.name}: ${details.stats.minifiedSize}`
      );
    }))
    .pipe(gulp.dest('src/assets/css-minified'));
});