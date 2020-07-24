# Getting started

Create a `.github/workflows/documentation.yml` file with the following content:
```yml
name: Build documentation

on:
  push:
    paths:
    - 'docs/**'
    - 'README.md'

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
    - uses: actions/setup-node@v1
      with:
        node-version: '12'
    - name: Install apos-docs
      run: npm install apos-docs -g
    - name: Use apos-docs
      run: apos-docs -t Apos.Input -b /Apos.Input
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Edit this line for your project:
`run: apos-docs -t Apos.Input -b /Apos.Input`

The `-t` option lets you define the project name to show on the sidebar.

The `-b` option lets you define the subdirectory that the site will end up in. For a repository-level gh-pages deployment `[username].github.io/[repository name]`, you should set the value to `/[repository name]`.
