const fs = require('fs-extra');
const yaml = require('yaml');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const through = require('through2');
const path = require('path');

if (!global.cli) {
    global.params = {
        title: 'AposDocs',
        base: '',
        docs: 'docs',
        theme: 'src/theme',
    }
}

const theme = global.params.theme ? { path: global.params.theme, dir: null } : { path: 'src/theme', dir: __dirname };

var site = {
    title: global.params.title,
    base: global.params.base,
    docs: global.params.docs
};

global.site = site;

let nav;

gulp.task('clean', () => {
    const del = require('del');
    return del([
        'dist/**/*'
    ]);
});

gulp.task('nav', cb => {
    try {
        nav = yaml.parse(fs.readFileSync(`${site.docs}/nav.yml`, 'utf-8'));
    } catch (error) {
        nav = {
            links: [],
            social: []
        }
    }
    cb();
});

gulp.task('html', () => {
    const fm = require('gulp-front-matter');
    const md = require('markdown-it')();
    const mustache = require('gulp-mustache');
    const rename = require('gulp-rename');
    const loadTheme = require('./src/theme');
    const htmlmin = require('gulp-htmlmin');
    loadTheme(md);

    return gulp.src([`${site.docs}/**/*.md`, 'README.md'])
        .pipe(rename(path => {
            const root = path.dirname ? `${path.dirname}/` : '';
            const trunk = path.basename === 'README' ? '' : path.basename;
            return {
                dirname: `${root}${trunk}`,
                basename: 'index',
                extname: '.html'
            }
        }))
        .pipe(fm({
            property: 'data',
            remove: true
        }))
        .pipe(through.obj((file, _, cb) => {
            global.title = '';
            const html = md.render(String(file.contents));
            file.data.title = global.title || file.data.title;
            file.data.isAutoTitle = !global.title;
            file.contents = Buffer.from(html);
            cb(null, file);
        }))
        .pipe(through.obj((file, _, cb) => {
            const title = file.data.title || 'Untitled';
            const permalink = `/${file.relative.replace(/\\/g, '/')}`;

            gulp.src(`${theme.path}/layout/page.mustache`, { ...theme.dir && { cwd: theme.dir } })
                .pipe(mustache({
                    site,
                    nav: { links: nav.links.map(l => ({ ...l, link: `${site.base}${l.link}`, isCurrentPage: `${l.link}index.html` === permalink })), social: nav.social },
                    isHome: `/index.html` === permalink,
                    title,
                    isAutoTitle: file.data.isAutoTitle,
                    body: String(file.contents)
                }, { extension: '.html' }))
                .pipe(through.obj((file2, _, cb2) => {
                    file.contents = Buffer.from(file2.contents);

                    cb2();
                    cb(null, file);
                }))
        }))
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: false,
            decodeEntities: true,
            removeComments: true,
            removeEmptyAttributes: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest('dist/', { cwd: process.cwd }));
});

gulp.task('css', () => {
    const postcss = require('gulp-postcss');

    return gulp.src(`${theme.path}/css/styles.css`, { ...theme.dir && { cwd: theme.dir } })
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-nested'),
            require('tailwindcss')(path.join(__dirname, 'tailwind.config.js')),
            ...prod(() => require('cssnano')({
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            }))
        ]))
        .pipe(gulp.dest('dist/', { cwd: process.cwd }));
});

gulp.task('nojekyll', () => {
    return gulp.src('src/.nojekyll', { cwd: __dirname })
        .pipe(gulp.dest('dist/', { cwd: process.cwd }))
});

gulp.task('build', gulp.series(['clean', 'nav', 'html', 'nojekyll', 'css']))

gulp.task('dev', () => {
    browserSync.init({
        notify: false,
        server: "./dist"
    });

    gulp.task('build')();

    gulp.watch([`${site.docs}/**/*.md`, 'README.md', `${theme.path}/layout/**/*.mustache`, `${theme.path}/index.js`, `${site.docs}/nav.yml`], gulp.series(['nav', 'html'])).on('change', browserSync.reload);
    gulp.watch([`${theme.path}/css/styles.css`, 'tailwind.config.js'], gulp.series(['css'])).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['build']));

function prod(library) {
    return process.env.NODE_ENV === 'production' ? [library()] : []
}
