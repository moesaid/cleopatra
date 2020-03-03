const { src, dest, task, watch, series, parallel } = require('gulp');
const options = require("./package.json").options; 
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const purify = require('gulp-purifycss');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const logSymbols = require('log-symbols');
const markdown = require('gulp-markdown');
const fileinclude = require('gulp-file-include');
const cache = require('gulp-cache');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

//Load Previews on Browser on dev
task('livepreview', (done) => {
    browserSync.init({
        server: {
            baseDir: options.paths.dist.base
        },
        port: 8080,
        https: true,    
        notify: false,
        open: false,
    });
    done();
});

//Reload functions which triggers browser reload
function previewReload(done){
    console.log("\n\t" + logSymbols.info,"Reloading Preview.\n");
    browserSync.reload();
    cache.clearAll(done);
    done();
}

task('dev-html', () => {
    return src(options.paths.src.base+'/views/*.html')
           .pipe(fileinclude({prefix: '@'}))
           .pipe(dest(options.paths.dist.base));
}); 

task('build-html', () => {
    return src(options.paths.src.base+'/views/*.html')
            .pipe(fileinclude({prefix: '@'}))
            .pipe(dest(options.paths.build.base));
}); 

task('readme' , () => {
    return src('README.md')
            .pipe(markdown())
            .pipe(dest(options.paths.dist.base)); 
});

//Compiling styles
task('dev-styles', ()=> {
    var tailwindcss = require('tailwindcss'); 
    return src(options.paths.src.css + '/**/*')         
        .pipe(sass().on('error', sass.logError))        
        .pipe(postcss([
            tailwindcss(options.config.tailwindjs),
            require('autoprefixer'),
        ]))
        .pipe(concat({ path: 'style.css'}))
        .pipe(dest(options.paths.dist.css));
});

//Compiling styles
task('build-styles', ()=> {
    return src(options.paths.dist.css + '/**/*')
        .pipe(purgecss({
            content: ["src/views/**/*.html","src/**/.*js"],
            extractors: [{
                extractor: TailwindExtractor,
                extensions: ['html']
            }]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(options.paths.build.css));
});

//merging all script files to a single file
task('dev-scripts' ,()=> {
    return src([options.paths.src.js + '/libs/**/*.js',options.paths.src.js + '/**/*.js'])
           .pipe(concat({ path: 'scripts.js'}))
           .pipe(dest(options.paths.dist.js));
});


//merging all script files to a single file
task('build-scripts' ,()=> {
    return src([options.paths.src.js + '/libs/**/*.js',options.paths.src.js + '/**/*.js'])
           .pipe(concat({ path: 'scripts.js'}))
        //    .pipe(uglify())
           .pipe(dest(options.paths.build.js));
});

task('dev-imgs', (done) =>{
    src(options.paths.src.img + '/**/*')
    .pipe(dest(options.paths.dist.img));
    done();
});

task('build-imgs', (done) =>{
    src(options.paths.src.img + '/**/*')
    .pipe(imagemin())
    .pipe(dest(options.paths.build.img));
    done();
});


//Watch files for changes
task('watch-changes', (done) => {

    //Watching HTML Files edits
    watch(options.config.tailwindjs,series('dev-styles',previewReload));

    //Watching HTML Files edits
    watch(options.paths.src.base+'/views/**/*.html',series('dev-styles','dev-html',previewReload));

    //Watching css Files edits
    watch(options.paths.src.css+'/**/*',series('dev-styles',previewReload));

    //Watching JS Files edits
    watch(options.paths.src.js+'/**/*.js',series('dev-scripts',previewReload));

    //Watching Img Files updates
    watch(options.paths.src.img+'/**/*',series('dev-imgs',previewReload));    

    console.log("\n\t" + logSymbols.info,"Watching for Changes made to files.\n");

    done();
});

//Cleaning dist folder for fresh start
task('clean:dist', ()=> {
    console.log("\n\t" + logSymbols.info,"Cleaning dist folder for fresh start.\n");
    return del(['dist']);
});

//Cleaning build folder for fresh start
task('clean:build', ()=> {
    console.log("\n\t" + logSymbols.info,"Cleaning build folder for fresh start.\n");
    return del(['build']);
});

//series of tasks to run on dev command
task('development', series('clean:dist','dev-html','dev-styles','dev-scripts','dev-imgs',(done)=>{
    console.log("\n\t" + logSymbols.info,"npm run dev is complete. Files are located at ./dist\n");
    done();
}));

task('optamizedBuild', series('clean:build','build-html','dev-styles','build-styles','build-scripts','build-imgs',(done)=>{
    console.log("\n\t" + logSymbols.info,"npm run build is complete. Files are located at ./build\n");
    done();
}));


exports.default = series('development','livepreview','watch-changes');
exports.build = series('optamizedBuild');