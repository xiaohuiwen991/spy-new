var gulp = require('gulp');
// var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var config=require('./data/config.json');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');//npm install --save-dev gulp-csslint
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var browserify=require('gulp-browserify');
var version=config.version;
var replace = require('gulp-replace');//npm install --save-dev gulp-replace
var fileinclude = require('gulp-file-include');
var minimist = require('minimist');
//var knownOptions = {
//    string: 'env',
//    default: { env: process.env.NODE_ENV || 'production' }
//};
var knownOptions = {
    string: 'file',
    default: { file: 'view/**/*.*' }
};
var options = minimist(process.argv.slice(2), knownOptions);
//var livereload = require('gulp-livereload');

//gulp.task('live', function () {    // 这里的watch，是自定义的，写成live或者别的也行
//    var server = livereload();
//    gulp.watch('dist/**/*.*', function (file) {
//        for(var n in server)console.log(n)
//        //server.change(file.path);
//    });
//});

//gulp.task('less', function() {
//gulp.src(['dist/**/*.*'])
//    //.pipe(less())
//   // .pipe(gulp.dest('frontend-tech/webIndexPage/src'))
//    .pipe(livereload());
//});

//gulp.task('live', function() {
//    livereload.listen();
//    gulp.watch('*.*',function(file){
//        console.log(file.path)
//        gulp.src(file.path).pipe(livereload());
//    });
//});

gulp.task('hint', function() {
    return gulp.src('script/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint', function() {
    return gulp.src('dist/css/*.css')
        .pipe(csslint())
        .pipe(csslint.reporter());
});

gulp.task('watch', function() {
    return gulp.watch('script/*.js', ['hint']);
});

gulp.task('less', function () {
    return gulp.src(['style/base.less','style/index.less'])
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minifycss', function() {
    return gulp.src(['dist/css/base.css','dist/css/index.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('bify', function(){
    return gulp.src('lib/base.js')
        //.transform(babelify)
       // .bundle()
       // .pipe(source('bundle.js'))
        .pipe(browserify())
        .pipe(gulp.dest('dist/js'));
});

//gulp.task('bify', function() {
//    // Single entry point to browserify
//    return gulp.src('script/base.js')
//        .pipe(browserify({
//            //insertGlobals : true,
//            //debug : !gulp.env.production
//        }))
//        .pipe(gulp.dest('dist/js'))
//});

gulp.task('uglify', function() {
    return gulp.src(['dist/js/base.js'])//,'script/index.js'])
       // .pipe(rename({suffix: ''}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// dragon
gulp.task('base',['bify'],function(){
    gulp.run('uglify');
});

// dragon
gulp.task('dragon',['hint','bify','less','minifycss','view'],function(){
    gulp.run('uglify');
    //gulp.watch('pre/js/*.js' , ['hint','js'] );

    //gulp.watch('pre/less/*.less', function(){
    //    gulp.task('less');
    //});
    //gulp.watch('pre/css/*.css', function(){
    //    gulp.task('minifyCss');
    //});
});

gulp.task('default', ['dragon']);



gulp.task('upversion', upversion);

function upversion(){
    return gulp.src(['partial/common-top.html','partial/common-bottom.html'])
        .pipe(replace(/version[^"]*"\>/g, 'version=x">'.replace('x',version)))
        .pipe(replace(/"date" content="[^"]*"/,'"date" content="[^"]*"'.replace('[^"]*',new Date().toLocaleString())))
        .pipe(gulp.dest('partial'));
}

function include(fileName){
    upversion();
    setTimeout(function(){
        return gulp.src(fileName?'view/'+fileName:'view/**/*.*')
            .pipe(fileinclude({
                prefix: '@@'
            }))
            .pipe(rename({dirname: './'}))
            .pipe(gulp.dest('dist/view'));
    },500);
}
gulp.task('include', function() {
    include(options.file);
    //gulpif(options.file !== '',includeOne(options.file))
    //return gulp.src(['view/**/*.*'])
    //    .pipe(fileinclude({
    //        prefix: '@@'
    //    }))
    //    .pipe(rename({dirname: './'}))
    //    .pipe(gulp.dest('dist/view'));
});

gulp.task('view', ['upversion'],function () {
        setTimeout(function(){
            gulp.run('include');
        },500);
});

var knownOptions2 = {
    string: 'file',
    default: { file: 'script/*.*' }
};
var knownOptions3 = {
    string: 'name',
    default: { name:''}
};
var knownOptions4 = {
    string: 'nd',
    default:null
};

var options2 = minimist(process.argv.slice(2), knownOptions2);
var options3 = minimist(process.argv.slice(3), knownOptions3);
var options4 = minimist(process.argv.slice(4), knownOptions4);

function comment(fileName,editer,creater,noDefaultDic){
    if(noDefaultDic){
        var pp=gulp.src(fileName);
    }else{
        var pp=gulp.src(fileName?'script/'+fileName:'script/*.*');
    }
    editer && pp.pipe(replace(/\*\s@?edited\sBy[^\n]*\n/i, '* @edited By '+editer+'\n'))
    creater && pp.pipe(replace(/\*\s@?created\sBy[^\n]*\n/i, '* @created By '+creater+'\n'))
    pp.pipe(replace(/\*\s\@date[^\n]*\n/gi, '* @date '+new Date().toLocaleString()+'\n'))
    .pipe(gulp.dest('script'));
}
gulp.task('comment', function() {
    var noDefaultDic=typeof options4.nd!='undefined'
    var editer=options3.name.split(',')[0];
    var creater=options3.name.split(',')[1];
    creater===''&&(creater=editer);
    comment(options2.file,editer,creater,noDefaultDic);
});