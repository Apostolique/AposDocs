# AposDocs
Site generator for project documentation. This is meant to be used in combination with GitHub Actions

## Description
Takes in a `docs` directory with your markdown files. Compiles the output into a `dist` directory. Adds the content of the `dist` directory to a `gh-pages` branch.

## Getting started
```
npm install apos-docs -g
apos-docs -t AposDocs -b /AposDocs
```

## Tech Stack
* [node](https://nodejs.org)
* [gulp](https://gulpjs.com/)
* [font-matter](https://github.com/jxson/front-matter)
* [gh-pages](https://github.com/tschaub/gh-pages)
* [markdown-it](https://github.com/markdown-it/markdown-it)
* [mustache](https://github.com/janl/mustache.js)
* [prism](https://github.com/PrismJS/prism)
* [tailwindcss](https://tailwindcss.com/)
