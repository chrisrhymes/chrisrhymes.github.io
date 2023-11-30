---
title: Using prettier to format your Jekyll theme
description: How to use prettier to format your Jekyll theme's HTML code
layout: post
date: 2023-11-30 18:00:07
hero_image: /img/formatting-jekyll-prettier.jpg
hero_height: is-large
hero_darken: true
image: /img/formatting-jekyll-prettier.jpg
tags: React JavaScript ReactNative
---

I have been using prettier for a few years to automatically format code, especially JavaScript and TypeScript projects, as it helps standardise the output on a shared code project. I have maintained a few different Jekyll themes over the years and wanted to use the power of prettier to automatically format code consistently.

Here are some of the issues I found and how I managed to configure prettier to meet my needs.

## HTML file syntax highlighting

In Jekyll, your layouts and includes files are HTML files and my code editor treated them as HTML files. This meant VS Code didn’t really understand the liquid syntax and didn't offer any syntax highlighting by default. It also meant that when I used prettier with the format on save setting it would lead to unexpected results.

I left it like this for a long time as I didn't know a way around this.

After building a [syntax highlighter for Gutenberg blocks](https://marketplace.visualstudio.com/items?itemName=chrisrhymes.gutenburg-comment-highlight) for VS Code it gave me a better understanding of what VS Code can do and how you can customise it further.

One thing you can do in VS Code is manually select the format of the file in the footer and select Liquid instead of HTML. Suddenly I had the liquid syntax highlighting I had been missing. Manually editing each file seemed cumbersome so I researched that you could overwrite the settings in your workspace to set HTML files as liquid by default.

```json
// .vscode/settings.json

{
  "files.associations": {
    "*.html": "liquid"
  }
}
```

## Prettier formatting

Next I wanted to set these files to be formatted automatically using prettier. Prettier doesn't support liquid straight out of the box, but there is a [prettier plugin made by Shopify](https://github.com/Shopify/prettier-plugin-liquid) that does.

I added this plugin to my npm dependencies:

```bash
npm install -D prettier @shopify/prettier-plugin-liquid
```

And followed the instructions to add it to the settings:

```json
// .vscode/settings.json

{
  "files.associations": {
    "*.html": "liquid"
  },
  "[liquid]": {
    "editor.defaultFormatter": "Shopify.theme-check-vscode",
    "editor.formatOnSave": true
  }
}
```

And added the plugin to my .prettierrc configuration file.

```json
// .prettierrc

{
  "plugins": ["@shopify/prettier-plugin-liquid"]
}
```

Now when I saved the html files it automatically highlighted the syntax and formatted on save using prettier.

## Command Line

I now wanted to run prettier on all the files in the project and auto format them using a command line script. I created a new script in the package.json to run prettier on all of the files and write the changes to the files.

```json
// package.json

{
  "scripts": {
    "prettier": "prettier . —write"
  }
}
```

But this didn't format the html files as liquid. Instead, it formatted them as HTML files. I needed to work out how to overwrite the settings for these files to make them be formatted as liquid.

Reading up on the prettier configuration options I saw there was an overrides option where you could tell it what parser to use for the files.

Initially I guessed that I wanted to use a parser called "liquid", but when I ran the command, it didn't know that parser.

I then looked through the code on GitHub for the shopify plugin and found a file called [parser.ts](https://github.com/Shopify/theme-tools/blob/main/packages/prettier-plugin-liquid/src/parser.ts) which had an object called parsers that exported `"liquid-html"`, so I gave that a go in my `.prettierrc` file and ran the command again. This time it formatted all the HTML files as liquid files.

I modified the configuration a bit as I realised I really only wanted to treat the includes and layouts files as liquid templates and not all HTML files as some might be HTML content pages.

Here is my final .prettierrc file.

```json
// .prettierrc

{
  "plugins": ["@shopify/prettier-plugin-liquid"],
  "overrides": [
    {
      "files": "_includes/*.html",
      "options": {
        "parser": "liquid-html"
      }
    },
    {
      "files": "_layouts/*.html",
      "options": {
        "parser": "liquid-html"
      }
    }
  ]
}
```

## GitHub Actions

So now I had my command running manually I thought it would be cool to format the files automatically using GitHub actions. This isn't suitable for every one so you need to decide if this is suitable for your project.

This action runs when a pull request is made to the main branch, but you can modify it as needed to your purposes.

The process is as follows:

- checks out the code
- sets up node
- Installs the dependencies
- Runs prettier
- Automatically commits the changes for you

```yaml
# .github/workflows/prettier.yaml

name: Prettier formatting

on:
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - name: Prettier
        run: npm run prettier
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: Prettier formatting
          skip_fetch: true
```

## Conclusion

So now we have automatic liquid syntax highlighting in VS Code, automatic formatting on save, a command to run to manually format the files, and an action to automatically format the files if we forget to do it manually.

<a href="https://stocksnap.io/photo/city-skyline-68NE2VS3GG">Photo</a> by <a href="https://stocksnap.io/author/mattbangophotos">Matt Bango</a> on <a href="https://stocksnap.io">StockSnap</a>
