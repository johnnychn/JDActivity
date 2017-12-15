//在你的项目根目录下创建gulpfile.js，代码如下：

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    usemin = require('gulp-usemin'),//替换Html内容
    rev = require('gulp-rev'),
    del = require('del');

// 压缩html
gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({message: 'html task ok'}));

});
//拷贝文件
gulp.task('copy', function () {
    gulp.src('./media/**')
        .pipe(gulp.dest('./dist/media/'));
    return gulp.src('./*.jpg')
        .pipe(gulp.dest('./dist/'));
    //return gulp.src('./lib/**')
    //    .pipe(gulp.dest('./dest/lib/'))
    //    .pipe(notify({message: 'copy task ok'}));

});

//
// // 压缩图片
// gulp.task('img', function () {
//     return gulp.src('./images/*')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngcrush()]
//         }))
//         .pipe(gulp.dest('./dist/images/'))
//         .pipe(notify({message: 'img task ok'}));
// });
//
// // 合并、压缩、重命名css
// gulp.task('css', function () {
//     return gulp.src('./css/*.css')
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest('dist/css'))
//         //.pipe(rename({ suffix: '.min' }))
//         .pipe(minifycss())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(notify({message: 'css task ok'}));
// });
//
// // 检查js
// gulp.task('lint', function () {
//     return gulp.src('./js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(notify({message: 'lint task ok'}));
// });
//
// // 合并、压缩js文件
// gulp.task('js', function () {
//     return gulp.src('./js/*.js')
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('dist/js'))
//         //.pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
//         .pipe(notify({message: 'js task ok'}));
// });


gulp.task('usemin', function () {
    del(['dist'], {dryRun: true});
    return gulp.src('./*.html')
        .pipe(usemin({
            css: [minifycss, rev],
            html: [function () {
                return htmlmin({empty: true,removeComments:true,collapseWhitespace:true});
            }],
            js: [uglify, rev],
            inlinejs: [uglify],
            inlinecss: [minifycss, 'concat']
        }))
        .pipe(gulp.dest('dist/'));
});
// 默认任务
gulp.task('default', ['usemin', 'copy']

//gulp.task('default', ['copy', 'css', 'lint', 'js', 'html']
//function () {
//   return  gulp.run('copy', 'css', 'lint', 'js', 'html');

    //// 监听html文件变化
    //gulp.watch('src/*.html', function () {
    //    gulp.run('html');
    //});
    //
    //// Watch .css files
    //gulp.watch('src/css/*.css', ['css']);
    //
    //// Watch .js files
    //gulp.watch('src/js/*.js', ['lint', 'js']);
    //
    //// Watch image files
    //gulp.watch('src/images/*', ['img']);
);