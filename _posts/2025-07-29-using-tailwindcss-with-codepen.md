---
title: Using Tailwindcss with Codepen
description: How I used Tailwindcss with Codepen
layout: post
hero_image: /img/tailwind-codepen.jpg
hero_height: is-large
hero_darken: true
image: /img/tailwind-codepen.jpg
tags: webdev css tailwind
---

I created a free account for Codepen to provide a demo with my blog post about 'Creating a custom toggle in TailwindCSS' but it took me a little while to figure out how to use Tailwindcss with codepen. So, this is what I did to get it working.

## Add the Play CDN

Looking at the [get started guide](https://tailwindcss.com/docs/installation/play-cdn) in Tailwindcss documentation, it states:

> Use the Play CDN to try Tailwind right in the browser without any build step. The Play CDN is designed for development purposes only, and is not intended for production.

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

First I copied and pasted the section from the `<head>` tags in the Tailwind into the HTML section of Codepen, **but you shouldn't do this**.

I got a warning in Codepen saying the HTML section is only for content inside the body tags. So this needed to go somewhere else.

## Pen settings

Instead of putting the above in the HTML section, you need to open the Pen settings, by clicking on the `Settings` button with the big cog.

![Codepen settings](/img/pen-settings.jpg)

Once in the settings, click on the HTML section on the left, then find the `Stuff for <head>` section and paste it in there.

Then click `Save and close`.

## Away you go

Now you can start writing your HTML in the HTML section and adding the Tailwindcss utility classes. The page will refresh and display your styled content.

## Customising the theme

As the Tailwindcss documentation states, you can also customise your theme by adding a style tag with the `type="text/tailwindcss"` attribute.

This seems to work in either the main HTML section or within the `Stuff for <head>` section in the settings.

```html
<style type="text/tailwindcss">
  @theme {
    --color-clifford: #da373d;
  }
</style>
<p class="text-clifford">Test</p>
```

<a href="https://stocksnap.io/photo/bridge-highway-09NVK7X9GG">Photo</a> by <a href="https://stocksnap.io/author/sergei">Sergei Gussev</a> on <a href="https://stocksnap.io">StockSnap</a>
