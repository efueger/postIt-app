import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import dotenv from 'dotenv';
import jasmineNode from 'gulp-jasmine-node';
import exit from 'gulp-exit';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';

// Configure environment variables
dotenv.config({ path: './.env' });
const NODE_ENV = process.env.NODE_ENV;

const config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './template/public'
};

gulp.task('css', () => {
  return gulp.src('./template/css/app.scss')
  .pipe(sass({
    includePaths: [`${config.bootstrapDir}/assets/stylesheets`],
  }))
  .pipe(gulp.dest(`${config.publicDir}/css`));
});

gulp.task('fonts', () => {
  return gulp.src(`${config.bootstrapDir}/assets/fonts/`)
  .pipe(gulp.dest(`${config.publicDir}/fonts`));
});

// Run app server
gulp.task('serve', () =>
  nodemon({
    script: 'index.js',
    ext: 'js html',
    env: { NODE_ENV }
  })
);

// Test coverage
gulp.task('test', () => {
  gulp.src(['./server/models/*js', './server/controllers/*js', './server/routes/*js', './server/models/*js'])
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
  .on('finish', () => {
    gulp.src(['./server/test/functional/*Spec.js', './server/test/unit/*Spec.js'])
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmineNode())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
    .pipe(exit());
  });
});

gulp.task('default', ['css', 'fonts']);