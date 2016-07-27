/* eslint-disable no-undef, no-console */
import babel from 'gulp-babel';
import bg from 'gulp-bg';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import mochaRunCreator from './test/mochaRunCreator';
import path from 'path';
import postcss from 'gulp-postcss';
import runSequence from 'run-sequence';
import reporter from 'postcss-reporter';
import shell from 'gulp-shell';
import stylelint from 'stylelint';
import webpackBuild from './webpack/build';
import yargs from 'yargs';

const args = yargs
  .alias('p', 'production')
  .argv;

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint && file.eslint.fixed;
}

function runEslint() {
  return gulp.src([
    'gulpfile.babel.js',
    'app/**/*.js',
    'webpack/*.js'
  ])
  .pipe(eslint({
    fix: true
  }))
  .pipe(eslint.format());
}

/* eslint-disable */
function buildReact(minify) {
  gulp
    .src(['src/**/*.react.js', 'src/**/index.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
}

function buildSass() {
  //Copy files and directory structure from /scss to /dist
  gulp.src('src/**/*.scss').pipe(gulp.dest('dist'));
}
/* eslint-enable */

gulp.task('dist', () => {
  del(['dist/*']);
  buildReact(true);
  buildSass();
});

gulp.task('lint-fix-src', () => {
  return gulp.src('app/**/*.js')
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    // if fixed, write the file to dest
    .pipe(gulpIf(isFixed, gulp.dest('app/')));
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

function styleLint() {
  return gulp.src(['app/**/*.scss', 'webpack/*.scss'])
    .pipe(postcss(
      [
        stylelint({ configFile: path.join(__dirname, './.stylelintrc') }),
        reporter({ clearMessages: true })
      ]
    ));
}

gulp.task('stylelint', styleLint);

gulp.task('mocha', () => {
  mochaRunCreator('process')();
});

/* Enable to run single test file */
/* ex. gulp mocha-file --file app/browser/components/__test__/Button.js */
gulp.task('mocha-file', () => {
  mochaRunCreator('process')({ path: path.join(__dirname, args.file) });
});

/* Run a test on a shared component */
/* ex. gulp test-shared-component -c Gallery */
gulp.task('test-shared-component', () => {
  mochaRunCreator('process')({
    path: path.join(
      __dirname,
      'app/browser/components/shared/',
      args.c,
      '__test__',
      `${args.c}.spec.js`
    )
  });
});

gulp.task('test-component', () => {
  mochaRunCreator('process')({
    path: path.join(
      __dirname,
      'app/browser/components/',
      args.c,
      '__test__',
      `${args.c}.spec.js`
    )
  });
});

/* Continuous test running */
gulp.task('mocha-watch', () => {
  gulp.watch(
    ['app/browser/**', 'app/common/**', 'app/server/**'],
    mochaRunCreator('log')
  );
});

gulp.task('test', done => {
  runSequence('stylelint', 'eslint-ci', 'mocha', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './app/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon app/server')
));

gulp.task('server', ['env'], done => {
  if (args.production) {
    runSequence('clean', 'build', 'server-node', done);
  } else {
    runSequence('server-hot', 'server-nodemon', done);
  }
});

gulp.task('default', ['server']);
