---
title: Building a VS Code Extension for Gutenberg blocks
description: Why I built a VS Code extension for WordPress Gutenberg code blocks
layout: post
date: 2022-11-18 18:00:07
hero_image: /img/code-highlight.jpg
hero_height: is-large
hero_darken: true
image: /img/code-highlight.jpg
tags: WebDev WordPress VSCode
---

I have been tasked with building a new website using WordPress. The last time I used WordPress was a few years ago and involved using Advanced Custom Fields to build custom pages and layouts. Things have changed a lot over the years and now there is the built in Gutenberg editor, which uses blocks to create a custom layout and add content. The trouble was, there didn't seem to be great support in Visual Studio Code for the blocks, as they use HTML comments.

## Gutenberg Blocks

Here is an example block that adds the [Site Title block](https://wordpress.org/support/article/site-title-block/), which you can use to display your site's name, along with a level setting in a json object.

```html
<!-- wp:site-title {"level":0} -->
```

I don't know why the decision was made to use HTML comments for blocks, but after using it for a bit you get used to it. The main issue I had was that HTML comments are greyed out by most themes in Visual Studio Code and are not as easy to read as other code around it.

Gutenberg blocks also use a json object to pass settings or props into the blocks to change their display. Honestly, I struggled writing json without any syntax highlighting, missing double quotes and putting closing brackets in the wrong places when you have many nested objects. I spent a long time debugging what turned out to be simple mistakes.

## Syntax Highlighting in VS Code

This led me to research about how VS Code works and if it would be possible to add highlighting to the comments. A quick web search led me to the [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide) on the VS Code docs site. This explained that you can build an extension that uses custom grammars to add syntax highlighting.

VS Code uses these grammars to help split code into smaller parts, called tokens, where each part has a token type. For HTML, a token can be a tag, such as `<p>` or a class `<p class="title">` or even smaller parts such as the opening `<` and closing part of the tag `>`.

There are many standard grammars already which can be found in the [VS Code GitHub repository](https://github.com/microsoft/vscode/tree/main/extensions). VS Code lets you create an extension to customise grammars. You can get started creating an extension using [Yeoman](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#developing-a-new-grammar-extension).

## Injection Grammars

You can create a custom grammar for a new language, but HTML already has a grammar, so instead I needed to create an [injection grammar](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#injection-grammars). An injection grammar will extend the existing grammar allow you to add your own rules and define your own tokens.

Following the examples I created an extension that injected the custom grammar into HTML comments. The package.json defines the path to the injection file (path) and what it extends with the injectTo key.

```json
// package.json

"grammars": [
    {
        "scopeName": "gutenberg-comment.injection",
        "path": "./syntaxes/injection.json",
        "injectTo": [
            "text.html.derivative"
        ]
    }
]
```

To find out what to extend (`text.html.derivative`) I opened the Command Palette and then searched for 'Developer: Inspect Editor Tokens and Scopes' and pressed enter. This allows you to click on an element in the editor, such as the HTML comment I wanted to update, and it will tell you what scope VS Code defines it as.

Next I had to create rules that match particular content and define tokens. This is done using regex to match the string and then give it a name. The name you give is based on the [Textmate grammar naming convention](https://macromates.com/manual/en/language_grammars#naming_conventions), so I wanted to define the string beginning with `wp:` as a variable parameter.

```json
// injection.json

"gutenberg": {
    "match": "(wp:[^ ]+)",
    "name": "variable.parameter.gutenberg"
},
```

Next I wanted to apply json syntax to the json string in the comment. I tried several match regex expressions which didn't quite work, but then realised you could define the beginning `{` and the end `}` of the string which was much easier.

```json
"gutenberg-json": {
    "begin": "\\{",
    "end": "\\}",
    "name": "meta.embedded.block.json",
    "patterns": [
        {
            "include": "source.json"
        }
    ]
}
```

The VS Code Syntax Highlight Guide states that you should try and use `meta.embedded.*` where possible for the name for an embedded language. This helps tell VS Code that this is a language rather than a comment or a string. I also had to include the source.json in the patterns as it didn't set the language to json and display the highlighting without it.

Finally, I had to update the package.json to define that `meta.embedded.block.json` is an embedded language and that the language should be json.

```json
// package.json

"grammars": [
    {
        "scopeName": "gutenberg-comment.injection",
        "path": "./syntaxes/injection.json",
        "injectTo": [
            "text.html.derivative"
        ],
        "embeddedLanguages": {
            "meta.embedded.block.json": "json"
        }
    }
]
```

## Packaging it all up

Once I had tested this all out on my local machine, by copying the extension into `~/.vscode/extensions` directory, I could then package it all up and publish the extension to the VS Code Marketplace by following the guide to [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

My extension can now be found on the VS Code Marketplace and by searching for extensions from within VS Code.

[Gutenberg Comment Highlight](https://marketplace.visualstudio.com/items?itemName=chrisrhymes.gutenburg-comment-highlight)

The source code is also available on [GitHub](https://github.com/chrisrhymes/gutenburg-comment-highlight).

<a href="https://stocksnap.io/photo/macbook-laptop-7ULJ7GRFDB">Photo</a> by <a href="https://stocksnap.io/author/4440">Negative Space</a> on <a href="https://stocksnap.io">StockSnap</a>
