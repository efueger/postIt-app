import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import cache from 'gulp-file-cache';
import dotenv from 'dotenv';

// Configure environment variables
dotenv.config({ path: './.env' });

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

// Transpile es6 code
gulp.task('compile', () => {
  const stream = gulp.src(['./server/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('./server/dist'))
  return stream;
})

// Run app server
gulp.task('serve', () => 
  nodemon({
    script: 'index.js',
    ext: 'js html', 
    env: { 'NODE_ENV': process.env.NODE_ENV }
  })
);

gulp.task('default', ['css', 'fonts']);