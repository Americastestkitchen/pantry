/* eslint-disable no-undef, no-console */
import babel from 'gulp-babel';
import bg from 'gulp-bg';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import mochaRunCreator from './test/mochaRunCreator';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import webpackBuild from './webpack/build';
import yargs from 'yargs';

const args = yargs
  .alias('p', 'production')
  .argv;

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
  ])

  .pipe(eslint())
  .pipe(eslint.format());
};

function buildReact(minify) {
  gulp
    .src(['lib/**/*.react.js', 'lib/**/index.js'])
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

function buildSass() {
  //Copy files and directory structure from /scss to /dist
  gulp.src('lib/**/*.scss').pipe(gulp.dest('dist'));
}

gulp.task('dist', function() {
  del(['dist/*']);
  buildReact(true);
  buildSass();
});

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('clean', done => del('build/*', done));

gulp.task('build-webpack', ['env'], webpackBuild);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  // Exit process with an error code (1) on lint error for CI build.
  return runEslint().pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  mochaRunCreator('process')();
});

/* Enable to run single test file */
/* ex. gulp mocha-file --file src/browser/components/__test__/Button.js */
gulp.task('mocha-file', () => {
  mochaRunCreator('process')({path: path.join(__dirname, args['file'])});
});

/* Continuous test running */
gulp.task('mocha-watch', () => {
  gulp.watch(
    ['src/browser/**', 'src/common/**', 'src/server/**'],
    mochaRunCreator('log')
  );
});

gulp.task('test', done => {
  runSequence('eslint-ci', 'mocha', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon src/server')
));

gulp.task('server', ['env'], done => {
  if (args.production)
    runSequence('clean', 'build', 'server-node', done);
  else
    runSequence('server-hot', 'server-nodemon', done);
});

gulp.task('default', ['server']);
