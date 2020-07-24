#!/usr/bin/env node

process.env.NODE_ENV = 'production';

const gulp = require('gulp');
const { program } = require('commander');

program
    .name('apos-docs')
    .version('0.1.0')
    .option('-t, --title <title>', 'title for the project', 'Untitled')
    .option('-d, --documentation <path>', 'path to the markdown documentation files', 'docs')
    .option('-b, --base-url <url>', 'base url for the relative links. For example: "/AposDocs"', '')
    .option('-T, --theme <path>', 'path to a custom theme')
    .option('-D, --development', 'start a server to preview the documentation site locally')
    .parse(process.argv);

global.params = {
    title: program.title,
    base: program.baseUrl,
    docs: program.documentation,
    theme: program.theme,
};

global.cli = true;

console.log('Preparing to build docs.')

require('./gulpfile');
console.log('Build started.')
if (program.development) {
    gulp.task('dev')(() => {console.log('Done build!')});
} else {
    gulp.task('build')(() => {console.log('Done build!')});
}
