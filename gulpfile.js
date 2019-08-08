var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var debug = require('gulp-strip-debug');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var connect = require('gulp-connect');

var folder = {
    src: 'src/',
    dist: 'dist/'
};

var devMod = process.env.NODE_ENV == 'development'

gulp.task('default', ['html','css','js','images','server','watch']);

gulp.task('html', function(){
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + 'html/'))
});

gulp.task('images', function(){
    gulp.src(folder.src + 'images/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'images/'))
})

gulp.task('css', function(){
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + 'css/'))
});

gulp.task('js', function(){
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            page.pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + 'js/'))
});

gulp.task('server', function(){
    connect.server({
        port: '8888',
        livereload: true
    })
});

gulp.task('watch', function(){
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
});