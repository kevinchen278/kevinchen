/* required methods 

*/
var gulp	= require('gulp');
var concat	= require('gulp-concat');
var rename	= require('gulp-rename');
var uglify	= require('gulp-uglify');
var watch 	= require('gulp-watch');
var sass 	= require('gulp-sass');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var map		= require('map');
var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');
var browserSync	= require('browser-sync');
var angularTemplates = require('gulp-angular-templates');
var gulpCopy 			= require('gulp-copy');


/* tasks */

gulp.task('devjs',function(){
	return gulp.src('app/js/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app'));

});

gulp.task('depjs', function(){

	return gulp.src(['bower_components/angular/angular.js',
					 'bower_components/jquery/dist/jquery.js'])
			.pipe(concat('vendor.js'))
			.pipe(gulp.dest('app'))

});

gulp.task('depDist', function(){

	return gulp.src(['app/js/jquery.plugin.js'])
		.pipe(rename('plugin.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('bin'));
});

gulp.task('sass',function(){
	gulp.src(['app/css/styles.scss'])
		.pipe(sass({style:"expanded"}))
		.on('error',console.error.bind(console))
		.pipe(gulp.dest('app/css'));
});

gulp.task('sass-watch',function() {
	gulp.watch('app/css/**/*.scss',['sass']);
	gulp.watch('app/css/*.css',browserSync.reload);
});


gulp.task('watch',function(){
	   	browserSync({
	   		server: {
	   			baseDir: 'app/'
	   		}
	   	})
		gulp.watch('app/css/**/*.scss',['sass']);
		gulp.watch('app/js/**/*.js',browserSync.reload);
		gulp.watch('app/**/*.html',browserSync.reload);
    	gulp.watch('app/css/*.css',browserSync.reload);
});


gulp.task('imagemin', function () {
    return gulp.src('app/assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('cssmin', function () {
    gulp.src('app/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

 var myReporter = function(file, cb) {
  return map(function(file, cb) {
	  if (!file.jshint.success) {
	    console.log('JSHINT fail in '+file.path);
	    file.jshint.results.forEach(function (err) {
	      if (err) {
	        console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
	      }
	    });
	  }
	  cb(null, file);
  });
}; 

gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(myReporter));
});
 

gulp.task('minify', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('html', function () {
    return gulp.src('app/view/**/*.html')
        .pipe(angularTemplates({module:'kevinApp'}))
        .pipe(gulp.dest('./build/'));
});

gulp.task('copyfile',function(){
	return gulp.src(['app/favicon.ico','app/css/*.css','app/index.html','app/view/*.html','app/css/fonts/**/*.*','app/images/*.*','app/vendor/*.*','app/js/**/*.js','app/json/*.json'])
		.pipe(gulpCopy('./build/',{base:'app/'}));

})


gulp.task('default',function(callback){
	runSequence('devjs','depDist','cssmin','lint',callback);
});


