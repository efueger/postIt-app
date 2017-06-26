import gulp from 'gulp';
import sass from 'gulp-sass';

const config = {
  bootstrapDir: './bower_components/materialize/sass',
  publicDir: './template/public'
};

gulp.task('css', () => {
  return gulp.src(config.bootstrapDir + '/materialize.scss')
  .pipe(sass({
    includePaths: [config.bootstrapDir + '/_style.scss'],
  }))
  .pipe(gulp.dest(config.publicDir + '/css'));
});

// gulp.task('fonts', () => {
//   return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
//   .pipe(gulp.dest(config.publicDir + '/fonts'));
// });

gulp.task('default', ['css']);