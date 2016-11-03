var gulp = require('gulp');
var browserSync = process.env.PORT ? null : require('browser-sync').create();
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('nodemon', function(done) {
    var started = false;
    return $.nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['/node_modules/**/*', '/app', '/dist']
    }).on('start', function start() {
        if(!started) {
            done();
            started = true;
        }
    }).on('restart', function() {
        browserSync.reload();
    });

});

gulp.task('styles', function() {
    gulp.src("./app/scss/main.scss")
        .pipe($.sourcemaps.init())
        .pipe($.sassGlob())
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest("./dist/css/"))
        .pipe(browserSync.stream());
});

gulp.task('webpack', function(done) {
    gulp.src("./app/index.js")
        .pipe($.webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./dist'))
        .once("end", function() {
            setTimeout(function() { browserSync.reload()}, 1000);
            done();
        })
});

gulp.task('fonts', function() {
    gulp.src("./app/fonts/**/*")
        .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("images", function() {
    gulp.src("./app/images/**/*")
        .pipe(gulp.dest('./dist/images'))
});

gulp.task("index", function() {
    gulp.src("./app/index.html")
        .pipe(gulp.dest("dist/"))
});

gulp.task('watch', function() {
    gulp.watch(["./app/**/*.js"], ["webpack"]);
    gulp.watch(["./server/**/*.ejs"]).on("change", browserSync.reload);
    gulp.watch(["./app/index.js"], ["webpack"]);
    gulp.watch(["./app/**/*.scss"], ["styles"]);
    gulp.watch(["./app/fonts/**/*"], ["fonts"]).on("change", function(){setTimeout(function(){browserSync.reload()}, 1000)});
    gulp.watch(["./app/images/**/*"], ["images"]).on("change", browserSync.reload);
    gulp.watch(["./app/index.html"], ["index"]).on("change", function(){setTimeout(function(){browserSync.reload()}, 1000)});
});

gulp.task('serve', ['watch', 'nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:9000",
        browser: "google chrome",
        port: 9100,
        online: true
    });
});

gulp.task('default', ['styles', 'images', 'index', 'fonts', 'webpack']);