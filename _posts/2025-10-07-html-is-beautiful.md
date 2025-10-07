---
title: HTML is beautiful
description: Some reasons why I think HTML is simple, graceful and beautiful
layout: post
hero_image: /img/html.jpg
hero_height: is-large
hero_darken: true
image: /img/html.jpg
tags: webdev html
---

Building a modern website can sometimes lead you to be so far separated from the end result that is sent to the user. Developers can end up focusing on building sites with component based frontend frameworks, fetching data from APIs and installing hundreds of npm dependencies. We can become more interested in writing great code in their chosen programming language than what we serve to the website visitors. How did we get so far away from writing HTML?

## HTML is simple

It's true. HTML is pretty simple. It's a markup language with some simple tags to tell the browser how to render the content.

- If you need a top level heading, put it in a `<h1>` tag.
- If you need a paragraph of text, put it in a `<p>` tag.
- If you want an unordered list, put it in an `<ul>` tag with `<li>` for each list item.

This has led some to question whether HTML is a programming language.

Maybe that's why developers feel the need to abstract their time away from HTML? Make it a bit more complicated to feel like they are doing something more technical? I don't know?

Anyway, check out the [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) for a full breakdown.

## HTML is future proof

The [first ever webpage](https://info.cern.ch/) written with HTML can still be viewed to this day. This displays that it is backwards compatible with modern browsers, but if you think about it the other way, it also means that it is future proof.

## HTML is graceful

There are different specifications for HTML, with HTML5 being the most recent, but HTML5 tags will degrade gracefully in older browsers. Unlike JavaScript which stops rendering when an error occurs, HTML will gracefully continue rendering the rest of the page.

For example, if the old browser finds an article or section tag then it will be [rendered as a span](https://www.pietschsoft.com/post/2010/11/14/html5-day-1-new-tags-work-in-older-browsers-awesome).

On a side node, HTML5 still feels like a new thing to me, but after looking it up I discovered it was first released in January 2008!

> HTML5 was first released in a public-facing form on 22 January 2008, with a major update and "W3C Recommendation" status in October 2014.

[https://en.wikipedia.org/wiki/HTML5](https://en.wikipedia.org/wiki/HTML5)

## HTML is responsive

If you have been working in web development for a few years (ok, quite a few years) you may remember creating fixed width layouts with tables, then maybe using divs, then having to build mobile specific versions of websites, then responsive websites where the same website adapts to the device and screen size that is being used to view the website.

Haven't we come a long way!

Well, no not really, because if you think about it, HTML with no CSS was already responsive. Content in a paragraph tag automatically wraps to the screen size. Developers forcing content into a fixed width layout broke HTMLs default flowing nature.

## HTML is beautiful

If we want the user to click on something on the page to submit a form, then we could create a div and give it some styles to make it square with a fancy border and some shadow, then add a JavaScript listener so we can perform an action to submit the form when the user clicks it.

Or, we could use an input with type 'submit' that does all that for us.

```html
<form>
  // More form content
  <input type="submit" value="Submit" />
</form>
```

In this day and age of React components and endless frontend build complexities and npm dependencies, it's sometimes easy to forget what HTML can already do for you out the box.

Keep things simple where you can and make the most of built in and widely supported features where possible.
