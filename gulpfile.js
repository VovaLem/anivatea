const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const rigger = require("gulp-rigger");
const cssmin = require("gulp-cssmin");
const jsmin = require("gulp-jsmin");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync");
const { reload } = require("browser-sync");
const path = require("path");
const newer = require("gulp-newer");
const del = require("del");

const filesPath = {
    src: {
        html: "src/*.html",
        css: "src/scss/style.scss",
        js: "src/js/main.js",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    },
    build: {
        html: "dist/",
        css: "dist/css",
        js: "dist/js/",
        img: "dist/img/",
        fonts: "dist/fonts"
    },
    watch: {
        html: "src/**/*.html",
        css: "src/scss/**/*.scss",
        js: "src/js/**/*.js",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    },
    clean: {
        all: "dist/**/*.*",
        html: "dist/*.html",
        img: "dist/img/**/*.*",
        fonts: "dist/fonts/**/*.*"
    }
}

browserSync.init({
    server: {
        baseDir: "./dist"
    }
});

function buildHTML() {
    del.sync(filesPath.clean.html);
    return gulp.src(filesPath.src.html)
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(gulp.dest(filesPath.build.html))
        .pipe(reload({
            stream: true
        }));
}

function buildCSS() {
    return gulp.src(filesPath.src.css)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(filesPath.build.css))
        .pipe(reload({
            stream: true
        }));
}

function buildJS() {
    return gulp.src(filesPath.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jsmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(filesPath.build.js))
        .pipe(reload({
            stream: true
        }));
}

function buildFonts() {
    del.sync(filesPath.clean.fonts);
    return gulp.src(filesPath.src.fonts)
        .pipe(gulp.dest(filesPath.build.fonts))
        .pipe(reload({
            stream: true
        }));
}

function buildImg() {
    return gulp.src(filesPath.src.img)
        .pipe(newer(filesPath.build.img))
        .pipe(imagemin())
        .pipe(gulp.dest(filesPath.build.img))
        .pipe(reload({
            stream: true
        }));
}

function watch() {
    gulp.watch(filesPath.watch.html, buildHTML);
    gulp.watch(filesPath.watch.css, buildCSS);
    gulp.watch(filesPath.watch.js, buildJS);
    let imgWatcher = gulp.watch(filesPath.watch.img, buildImg);
    gulp.watch(filesPath.watch.fonts, buildFonts);

    imgWatcher.on('unlink', function (filepath) {
        let filePathFromSrc = path.relative(path.resolve('src'), filepath);
        let destFilePath = path.resolve('dist', filePathFromSrc);
        del.sync(destFilePath);
    });
}

function cleanDist() {
	return del(filesPath.clean.all, { force: true });
}

exports.start = gulp.series(gulp.parallel(buildHTML, buildCSS, buildJS, buildFonts, buildImg), watch);
exports.build = gulp.series(gulp.parallel(buildHTML, buildCSS, buildJS, buildFonts, buildImg));