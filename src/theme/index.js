// https://github.com/markdown-it/markdown-it/tree/master/lib/rules_inline
// https://github.com/markdown-it/markdown-it/tree/master/lib/rules_block
// Search for stuff like: token = state.push('paragraph_open'

// This modifies the markdown output.

const path = require('path');
const prism = require('prismjs');
global.Prism = prism;

prism.hooks.add('wrap', function (env) {
    if (env.type !== 'keyword') {
        return
    }
    env.classes.push('keyword-' + env.content)
})

const loadLanguages = require('prismjs/components/');

var generatorLineNumbers = (code, lineStart) =>
    `<span aria-hidden="true" class="line-numbers" style="counter-reset: linenumber ${lineStart}">` +
    code
        .trim()
        .split('\n')
        .map(() => `<span></span>`)
        .join('') +
    '</span>'

module.exports = function(md) {
    md.renderer.rules.link_open = (tokens, i) => {
        const token = tokens[i];
        let href = token.attrs.find(a => a[0] === 'href')[1];

        if (href.length > 0 && href[0] === '/') {
            // TODO: Check if this is the right way to rewrite inbound links. Do I need to change other links?
            href = `${href.replace(global.site.docs, '')}`;
            href = `${global.site.base}${href}`

            const ext = path.extname(href);
            const basename = path.basename(href, ext);
            const dirname = path.dirname(href);
            if (ext === '.md') {
                const root = dirname;
                const trunk = basename === 'README' ? '' : basename;

                href = path.posix.join(root, trunk, '/');
            }
        }

        return `<a href="${href}">`;
    };
    md.renderer.rules.heading_open = (tokens, i) => {
        const token = tokens[i];

        if (token.tag === 'h1') {
            if (!global.title) {
                global.title = tokens[i + 1].children
                    .filter(t => ['text', 'code_inline'].includes(t.type))
                    .reduce((acc, t) => acc + t.content, '')
            }
            return '<h1>'
        }

        return `<${token.tag}>`;
    };
    md.renderer.rules.code_block = (tokens, i) => {
        const token = tokens[i];
        const code = token.content;
        const lines = generatorLineNumbers(code, 0);
        return `<div class="code"><pre class="syntax"><code>${lines}${code}</code></pre></div>`
    };
    md.renderer.rules.fence = (tokens, i) => {
        const token = tokens[i];
        const lang = token.info;
        let code;
        try {
            loadLanguages(lang);

            const grammar = prism.languages[lang]
            code = prism.highlight(token.content, grammar, lang);
        } catch (error) {
            console.log(error.message);
            code = prism.highlight(token.content, {});
        }

        const firstLine = 1;
        const lines = generatorLineNumbers(code, firstLine - 1);
        return `<div class="code" lang="${lang}"><pre class="syntax"><code>${lines}${code}</code></pre></div>`
    };
}
