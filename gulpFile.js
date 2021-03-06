const { dest, src, parallel, watch } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();

const styles = () => {
  return src('./src/scss/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoPrefixer({
      cascade: true,
      overrideBrowserslist: ['last 5 versions']      
    }))
    .pipe(concat('main.css'))
    .pipe(dest('./docs/css/'))
    .pipe(browserSync.stream());
}

const js = () => {
  return src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(dest('./docs/js/'))
    .pipe(browserSync.stream());
}

const html = () => {
  return src('./src/*.html')
    .pipe(dest('./docs/'))
    .pipe(browserSync.stream());
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './docs/'
    }
  });
}

const watching = () => {
  watch('./src/scss/*.scss', parallel(styles));
  watch('./src/*.html', parallel(html));
  watch('./src/js/*.js', parallel(js));
}

exports.build = parallel(styles, html, js);
exports.default = parallel(exports.build, server, watching);