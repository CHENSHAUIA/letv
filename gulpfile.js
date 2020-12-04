//1. 导入模块
const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

//2. 创建任务
//测试任务
// function fnTest(){
//     console.log('测试任务');
// }
//处理index.html
function fnCopyIndex(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
}
//处理js
function fnJS(){
    return gulp.src('./src/js/*.js')
        // .pipe(concat('all.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/js'));
}
//处理css
function fnCSS(){
    return gulp.src('./src/sass/*.scss')
        .pipe(sass({outputStyle:'expanded'}))
        // .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/css'));
}
//处理图片
function fnImg(){
    return gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
}
//处理子页面
function fnPage(){
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist/pages'));
}
function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/sass/*.scss',fnCSS);
    gulp.watch('./src/pages/*.html',fnPage);
}
//3. 导出模块

exports.index = fnCopyIndex;
exports.js = fnJS;
exports.css = fnCSS;
exports.img = fnImg;
exports.page = fnPage;
exports.default = fnWatch;