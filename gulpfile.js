var g = {
    gulp: require('gulp'),
    sass: require('gulp-sass'),
    browserSync: require('browser-sync').create(),
    concat: require('gulp-concat'),
    rename: require('gulp-rename'),
    uglify: require('gulp-uglify')
};

g.gulp.task('styles', function() {
    return g.gulp.src('_src/scss/style.scss')
        .pipe(g.sass())
        .pipe(g.gulp.dest('css/'))
        .pipe(g.browserSync.reload({stream: true}));
});

g.gulp.task('scripts', function() {
    return g.gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
        'bower_components/underscore/underscore.js',
        'bower_components/jquery.scrollTo/jquery.scrollTo.js',
        'bower_components/tether-select/select.js',
        '_src/js/main.js'
    ])
        .pipe(g.concat('main.js'))
        .pipe(g.gulp.dest('js/'))
        .pipe(g.rename({ extname: '.min.js' }))
        .pipe(g.uglify())
        .pipe(g.gulp.dest('js/'))
        .pipe(g.browserSync.reload({stream: true}));
});

g.gulp.task('default',function() {
    g.gulp.start('styles');
});

// Static Server + watching scss/html files
g.gulp.task('serve', ['styles','scripts'], function() {

    g.browserSync.init({
        server: "./"
    });

    g.gulp.watch('_src/scss/**/*.scss', ['styles']);
    g.gulp.watch('_src/js/**/*.js', ['scripts']);
    g.gulp.watch("*.html").on('change', g.browserSync.reload);
});