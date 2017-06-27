import gulp from 'gulp';
import sass from 'gulp-sass';

const config = {
  bootstrapDir: './bower_components/materialize',
  publicDir: './template/public'
};

gulp.task('css', () => {
  return gulp.src(config.bootstrapDir + '/sass/materialize.scss')
  .pipe(sass({
    includePaths: [config.bootstrapDir + '/sass/_style.scss'],
  }))
  .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', () => {
  return gulp.src(config.bootstrapDir + '/fonts/**/*')
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('js', () => {
  return gulp.src(config.bootstrapDir + '/js/**/*')
  .pipe(gulp.dest(config.publicDir + '/js'));
})

gulp.task('default', ['css', 'fonts', 'js']);