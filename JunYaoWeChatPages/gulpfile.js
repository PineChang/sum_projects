var gulp = require('gulp');
var  minifyCss = require('gulp-minify-css');
var  concat    = require('gulp-concat');
var  rename    = require('gulp-rename');
var  uglify    = require('gulp-uglify');
var  minifyHtml= require('gulp-minify-html');
//var  jshint    = require('gulp-jshint');



//进行js的压缩;

gulp.task('js-task', function() {
    gulp.src('app/js/{,*/}*.js')
    .pipe(uglify())//js压缩
    .pipe(gulp.dest('dist/js'));

})

//进行css文件压缩

gulp.task('css-task',function(){
	gulp.src('app/css/*.css')
	.pipe(minifyCss())
	.pipe(concat('all.css'))//合并为单文件
	.pipe(rename('all.min.css'))//并且重命名
	.pipe(gulp.dest('dist/css'));
})


//进行html文件压缩


gulp.task('html-task',function(){

	gulp.src('app/pages/*.html')
	.pipe(minifyHtml())
	.pipe(gulp.dest('dist/pages'));
})

//进行图片压缩
gulp.task('img-task',function(){

})

gulp.task('default',['js-task','css-task','html-task'])