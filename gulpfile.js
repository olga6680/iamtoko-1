// Подключаем Gulp и все необходимые библиотеки
var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		cleanCSS       = require('gulp-clean-css'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		rename         = require('gulp-rename'),
		svgstore       = require('gulp-svgstore'),
		ftp            = require('vinyl-ftp');

// Обновление страниц сайта на локальном сервере
gulp.task('browser-sync', function() {
	browserSync({
		proxy: "iamtoko",
		notify: false
	});
});

// Компиляция stylesheet.css
gulp.task('sass', function() {
	return gulp.src('catalog/view/theme/iamtoko/stylesheet/stylesheet.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('catalog/view/theme/iamtoko/stylesheet/'))
		.pipe(browserSync.reload({stream: true}))
});

//sprite SVG
gulp.task('sprite', function() {
	return gulp.src('catalog/view/theme/iamtoko/image/icon-*.svg')
	.pipe(svgstore({
		inlineSvg: true
		}))
	.pipe(rename('sprite.svg'))
	.pipe(gulp.dest('catalog/view/theme/iamtoko/image'));
	});


// Наблюдение за файлами
gulp.task('watch', function() {
	gulp.watch('catalog/view/theme/iamtoko/stylesheet/stylesheet.sass', gulp.parallel('sass'));
	gulp.watch('catalog/view/theme/iamtoko/template/**/*.twig', browserSync.reload);
	gulp.watch('catalog/view/theme/iamtoko/js/**/*.js', browserSync.reload);
	gulp.watch('catalog/view/theme/iamtoko/libs/**/*', browserSync.reload);
});

// Выгрузка изменений на хостинг
gulp.task('deploy', function() {
	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'catalog/view/theme/apple/**'
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('default', gulp.parallel('watch', 'sass', 'browser-sync'));
