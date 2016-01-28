/**
 * Created by Administrator on 2016/1/27.
 */
'use strict';
/*1��less���� ѹ�� �ϲ�

/*��gulpfile��������gulp������Ϊ������ṩ��һЩAPi*/
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync')
/*less���� ѹ�� �ϲ�*/
gulp.task('style',function(){
    /*����ʵ��ִ��style����ʱ�Զ�ִ��*/
    gulp.src('style/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({ stream: true}))
})
/*/!** 2��js�ϲ� ѹ�� ����*/
gulp.task('script',function(){
    gulp.src('script/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(browserSync.reload({ stream: true}))

})
/* * 3��img����*/
gulp.task('image',function() {
    gulp.src('images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true}))
})
/* * 4��htmlѹ��*!/*/
gulp.task('html',function(){
    gulp.src('*.html')
        .pipe(htmlmin(
            { collapseWhitespace:true,/*�հ������۵�*/
                removeComments:true/*ɾ��ע��*/
            }
    ))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({ stream: true}))
})
/*nmp install browser-sync-save-dev(������������Զ���*/
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:'dist/'
        },
    }),function(err,bs){
        console.log(bs.options.getIn('urls','local'))
    }
})
/*����*/
gulp.watch('scr/style/*.less',['style']);
gulp.watch('scr/script/*.js',['script']);
gulp.watch('scr/images/*.*',['images']);
