var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    // pngquant = require('imagemin-pngquant'),
    // spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create();

// const pngquant = require('imagemin-pngquant');

// css
gulp.task('css',function (){
    return gulp.src("scss/**/*.scss")
        .pipe(plugins.sass({
          errLogToConsole: true,
          outputStyle: 'compressed'
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions','safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
            cascade: false,
            remove:true
        }))
        // .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(gulp.dest("public/css/"));
});


// js
gulp.task('js', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest('public/minjs/'));
});


// 图片压缩
gulp.task('images', function () {
    return gulp.src('app/images/*')
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('public/images/'));
});

// 雪碧图
// gulp.task('sprite', function() {
//     var spriteData = 
//         gulp.src('./src/images/sprite/*') // source path of the sprite images
//             .pipe(spritesmith({
//                 imagesName: 'sprite.png',
//                 cssName: 'sprite.css',
//         }));

//     spriteData.images.pipe(gulp.dest('./public/css/sprite/')); // output path for the sprite
//     spriteData.css.pipe(gulp.dest('./public/css/sprite/')); // output path for the CSS
// });

// 清空图片、样式、js
// gulp.task('clean', function() {
//     gulp.src(['public/css/', 'public/js/', 'public/images/'], {read: false})
//         .pipe(plugins.clean());
// });


// nodemon重启express的服务器
gulp.task('nodemon', function (cb) {
  // del(['./public/*.html']);

  var called = false;

  return plugins.nodemon({
    script: 'bin/www'
  }).on('start', function () {
    if (!called) {
      cb();
      called = true;
    }
  });
});

// 浏览器刷新
gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:8080',
    files: ['public/**/*.*', 'views/**/*.*','routes/**/*.js'],
    browser: 'google chrome',
    notify: true,
    port: 8080
  });
});


// 监听
gulp.task('watch',['browser-sync'], function() {

    gulp.watch('scss/**/*.scss', ['css']);
    gulp.watch('public/js/**/*.js', ['js']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('routes/**/*.js', ['nodemon']);

    // var files = [
    //   'views/**/*.ejs',
    //   'public/css/**/*.css',
    //   'public/images/**/*',
    //   'public/js/**/*.js'
    // ];

    // browserSync.init(files, {
    //   server: {
    //      baseDir: './'
    //   }
    // });
    
});

// 默认任务
gulp.task('default', ['watch']);
// gulp.task('img', ['images']);

