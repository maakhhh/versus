const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const image = require('gulp-image')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const gulpif = require('gulp-if')
const argv = require('yargs').argv

const clean = () => {
  return del(['dist'])
}

const resourses = () => {
  return src('src/resourses/**')
    .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(gulpif(argv.prod, cleanCSS({
      level: 2
    })))
    .pipe(gulpif(argv.dev, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const normalize = () => {
    return src('src/normalize.css')
        .pipe(concat('normalize.css'))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(argv.prod, htmlMin({
      collapseWhitespace: true
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const icon = () => {
  return src('src/images/*.ico')
    .pipe(dest('dist/images'))
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulpif(argv.prod, uglify().on('error', notify.onError())))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/*.svg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
  ])
    .pipe(image({
      jpegRecompress: false,
      mozjpeg: false,
    }))
    .pipe(dest('dist/images'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resourses/**', resourses)

exports.styles = styles
exports.clean = clean
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlMinify, normalize, resourses, styles, svgSprites, images, icon, scripts, watchFiles)