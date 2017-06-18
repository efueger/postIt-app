import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

const config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './template/public'
};

gulp.task('css', () => {
  return gulp.src('./template/css/app.scss')
  .pipe(sass({
    includePaths: [config.bootstrapDir + '/assets/stylesheets'],
  }))
  .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', () => {
  return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

// Run app server
gulp.task('serve', () => 
  gulp.src('./server/app.js')
  .pipe(babel())
  .pipe(nodemon({
    script: 'app.js',
    ext: 'js html', 
    env: { 'NODE_ENV': process.env.NODE_ENV }
  }))
);

gulp.task('default', ['css', 'fonts']);