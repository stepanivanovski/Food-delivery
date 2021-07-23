const gulp        = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('styles', function() {
    return gulp.src("./src/css/style.css") //задача возвращает
        .pipe(gulp.dest("dist/css")) //отправка адреса по адрес
});

gulp.task('html', function () {
    return gulp.src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("./src/js/bundle.js")
        .pipe(gulp.dest("dist/js"));
});


gulp.task('icons', function () {
    return gulp.src("./src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});


gulp.task('images', function () {
    return gulp.src("./src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('styles', 'scripts',  'icons', 'html', 'images')); // парадедьно запускаются команды;