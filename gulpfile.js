var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var newer = require('gulp-newer')//检查变化
var htmlClean = require('gulp-htmlclean')
var uglify = require('gulp-uglify')//js压缩
var babel = require('gulp-babel')//es6语法
var stripDebug = require('gulp-strip-debug')//去掉console、debugger
var concat = require('gulp-concat')
var less = require('gulp-less')
var postcss = require('gulp-postcss')//自动添加前缀
var cssnano = require('cssnano')//压缩代码
var autoprefixer = require('autoprefixer')//添加前缀
var connect = require('gulp-connect')

//rev = require('gulp-rev'),更改版本号
// clean = require('gulp-clean'),//清空文件夹
// revCollector = require('gulp-rev-collector'),//gulp-rev插件，用于html模板更改引用路径 更新
    // upload = require('gulp-qndn').upload,//七牛上传
    // cdn = require('gulp-cdn-replace')//替换CDN链接


var devMode = process.env.NODE_ENV =='development'
console.log(devMode)
// var qnOptions = {
//     accessKey: 'minfRBjVddVGYZEUqSI1ivHM2EXjogL_txolrKDO',
//     secretKey: '72WGQVNZWksUp5MLJddU3181Qk6_fMlNDgagA9I5',
//     bucket: 'build',
//     // domin:'你的cdn链接',
//     delete: true
// }


var folder = {
    src : './src/',
    build : './build/'
}

//流读取
gulp.task("images",function(){//任务
    gulp.src(folder.src + 'images/*')//读文件
        .pipe(newer(folder.build + 'images'))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + 'images'))//写文件
})

gulp.task('html',function(){
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())//自动刷新页面
    if(!devMode){
        page.pipe(htmlClean())
    }
        
        page.pipe(gulp.dest(folder.build + 'html'))
})

gulp.task('js',function(){
    var page = gulp.src(folder.src + 'js/*')
    .pipe(connect.reload())
        .pipe(babel())
    //  .pipe(concat('main.js'))
        
        if(!devMode){
            page.pipe(uglify())
                .pipe(stripDebug())
        }
        page.pipe(gulp.dest(folder.build + 'js/'))
})

gulp.task('css',function(){
    var options = [autoprefixer(),cssnano()];
    var page = gulp.src(folder.src + 'css/*')
    .pipe(connect.reload())
        .pipe(less())
        if(!devMode){
            page.pipe(postcss(options))
        }
        page.pipe(gulp.dest(folder.build + 'css/'))
})
gulp.task('watch',function(){
    gulp.watch(folder.src + 'css/*',['css'])
    gulp.watch(folder.src + 'html/*',['html'])
    gulp.watch(folder.src + 'js/*',['js'])
    gulp.watch(folder.src + 'images/*',['images'])
})

gulp.task('connect',function(){
    connect.server({
        port:"8020",//改端口
        livereload:true
    })
})

gulp.task('default',['images','html','js','css','watch','connect'],function(){})//数组里是依赖模块，先执行