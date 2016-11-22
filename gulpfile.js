/* ============================================================
** Required
============================================================ */
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	del = require('del'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer');



/* ============================================================
** Scripts Task
============================================================ */
gulp.task('scripts', function() {
	gulp.src(['./app/js/**/*.js', '!./app/js/**/*.min.js'])
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./app/js'))
		.pipe(reload({stream: true}));
});


/* ============================================================
** Sass Task
============================================================ */
gulp.task('sass', function () {
  gulp.src('./app/scss/style.scss')
  	.pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./app/css'))
    .pipe(reload({stream: true}));
});


/* ============================================================
** Html Task
============================================================ */
gulp.task('html', function() {
	gulp.src('./app/**/*.html')
	.pipe(reload({stream: true}));	
});


/* ============================================================
** Build Task
============================================================ */
//Clear oul All files and folders from build folder
gulp.task('build:clearfolder', function(cb) {
	del(['build/**'], cb);
}	);

// Task for creating build directory for all files
gulp.task('build:copy', ['build:clearfolder'], function() {
	return gulp.src('./app/**/*/')
	.pipe(gulp.dest('build/'))	
});

//Task to remove unwanted build files 
//list all files and directories here that you don't want to include in build
gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
			'build/scss/',
			'build/js/!(*.min.js)'
		], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);


/* ============================================================
** Browser-Sync Task
============================================================ */
gulp.task('browser-sync', function () {
  browserSync({
  	server:{baseDir: './app/'}
  })
});

// Task to run build server for testing final App
gulp.task('build:serve', function () {
  browserSync({
  	server:{baseDir: './build/'}
  })
});


/* ============================================================
** Watch Task
============================================================ */
gulp.task('watch', function () {
  gulp.watch('./app/js/**/*.js', ['scripts']);
  gulp.watch('./app/scss/*.scss', ['sass']);
  gulp.watch('./app/**/*.html', ['html']);

});


/* ============================================================
** Default Task
============================================================ */
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
