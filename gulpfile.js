var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var connect = require('gulp-connect');



gulp.task('connect',function(){
	connect.server({
		port:8998,
		root:'./html',
		livereload:true
	})
});


gulp.task('live',function(){
	gulp.src("./html/*.html")
		.pipe(connect.reload());
});

/**
 * sasscore sass
 */

gulp.task('sass',function(){
	var processors = [
		autoprefixer
	];

	return gulp.src("./src/scss/*.scss")
			   .pipe(sass({outputStyle: 'compact'})).on('error',sass.logError)
			   .pipe(postcss(processors))
			   .pipe(gulp.dest("./html/static/css"));
});


gulp.task('watch',function(){
	gulp.watch("./src/scss/*.scss",['sass']);	
	gulp.watch(['./html/*.html','./html/static/css/*.css'],['live']);
});








gulp.task('default',['connect','watch']);

