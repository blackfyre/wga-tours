var g = {
    gulp: require('gulp'),
    sass: require('gulp-sass'),
    browserSync: require('browser-sync').create(),
    concat: require('gulp-concat'),
    rename: require('gulp-rename'),
    uglify: require('gulp-uglify')
};

g.gulp.task('styles', function() {
    return g.gulp.src('scss/style.scss')
        .pipe(g.sass())
        .pipe(g.gulp.dest('css/'))
        .pipe(g.browserSync.reload({stream: true}));
});

g.gulp.task('scripts', function() {
    return g.gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/dist/jquery.magnific-popup.js'
    ])
        .pipe(g.concat('main.js'))
        .pipe(g.gulp.dest('js/'))
        .pipe(g.rename({ extname: '.min.js' }))
        .pipe(g.uglify())
        .pipe(g.gulp.dest('js/'));
});

g.gulp.task('default',function() {
    g.gulp.start('styles');
});

// Static Server + watching scss/html files
g.gulp.task('serve', ['styles'], function() {

    g.browserSync.init({
        server: "./"
    });

    g.gulp.watch('scss/**/*.scss', ['styles']);
    g.gulp.watch("*.html").on('change', g.browserSync.reload);
});