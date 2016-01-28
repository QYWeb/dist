/**
 * Created by Administrator on 2016/1/27.
 */
'use strict';
/*1、less编译 压缩 合并

/*在gulpfile中先载入gulp包，因为这个包提供了一些APi*/
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync')
/*less编译 压缩 合并*/
gulp.task('style',function(){
    /*这里实在执行style人物时自动执行*/
    gulp.src('style/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({ stream: true}))
})
/*/!** 2、js合并 压缩 混淆*/
gulp.task('script',function(){
    gulp.src('script/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(browserSync.reload({ stream: true}))

})
/* * 3、img复制*/
gulp.task('image',function() {
    gulp.src('images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true}))
})
/* * 4、html压缩*!/*/
gulp.task('html',function(){
    gulp.src('*.html')
        .pipe(htmlmin(
            { collapseWhitespace:true,/*空白文字折叠*/
                removeComments:true/*删除注释*/
            }
    ))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true}))
})
/*nmp install browser-sync-save-dev(命令下载命令）自动化*/
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:'dist/'
        },
    }),function(err,bs){
        console.log(bs.options.getIn('urls','local'))
    }
})
/*监视*/
gulp.watch('scr/style/*.less',['style']);
gulp.watch('scr/script/*.js',['script']);
gulp.watch('scr/images/*.*',['images']);
