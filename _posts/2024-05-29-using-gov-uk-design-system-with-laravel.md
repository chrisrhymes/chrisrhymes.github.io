---
title: Using the GOV.UK Design System with Laravel
description: How to use the GOV.UK frontend Design System in a Laravel project
layout: post
hero_image: /img/london.jpg
hero_height: is-large
hero_darken: true
image: /img/london.jpg
tags: Laravel WebDev Frontend
---

I recently worked on a project using the GOV.UK Design System with a Laravel project. The GOV.UK frontend provides layouts and accessible HTML components with their own CSS and JavaScript. The two packages worked really well together, so I thought I would provide a quick example of how to get it setup.

## Things to consider

Before you use the GOV.UK frontend you must consider the following:

> You're welcome to use the template even if your service isn't considered part of GOV.UK, but your site or service must not:
>
> - identify itself as being part of GOV.UK
> - use the crown or GOV.UK logotype in the header
> - use the GDS Transport typeface
> - suggest that it's an official UK government website if it's not

[GOV UK Frontend Readme](https://github.com/alphagov/govuk-frontend-docs/blob/main/README.md)

## Creating a new project

First we create a new Laravel project, let's call it `gov-uk-laravel-demo`:

```bash
composer create-project laravel/laravel gov-uk-laravel-demo
```

## Install npm dependencies

Then we change into the directory and install our npm dependencies.

```bash
cd gov-uk-laravel-demo
npm install
npm install govuk-frontend --save
npm install sass vite-plugin-static-copy —dev
```

## Importing the styles

Rename `resources/css/app.css` to `resources/scss/app.scss` and add the following content.

```scss
$govuk-assets-path: "/build/assets/";

@import "node_modules/govuk-frontend/dist/govuk/all";
```

The sass variable is updating the default path from `/assets/` as we are using vite, which puts everything inside a `build` folder.

## Importing the JavaScript

In `resources/js/app.js`, update to the following to initialise the govuk-frontend JavaScript.

```javascript
import "./bootstrap";

import { initAll } from "govuk-frontend";

initAll();
```

## Configuring vite and building

Update vite.config.js to build our scss files (previously css) and [copy the fonts and images](https://frontend.design-system.service.gov.uk/import-font-and-images-assets/#copy-the-font-and-image-files-into-your-application) to the `public/build/assets` folder using the viteStaticCopy plugin.

```javascript
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/scss/app.scss", "resources/js/app.js"],
      refresh: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/govuk-frontend/dist/govuk/assets/",
          dest: "",
        },
      ],
    }),
  ],
});
```

Then run `npm run build` to build the css, js and copy the relevant assets.

## Creating a page

Copy and paste the [default page template HTML](https://design-system.service.gov.uk/styles/page-template/) from the documentation page into the `welcome.blade.php` file.

Remove the script tags at the bottom of the page

```html
<script type="module" src="/javascripts/govuk-frontend.min.js"></script>
<script type="module">
  import { initAll } from "/javascripts/govuk-frontend.min.js";
  initAll();
</script>
```

Then replace these two lines in the head:

```html
<link rel="manifest" href="/assets/manifest.json" />
<link rel="stylesheet" href="/stylesheets/govuk-frontend.min.css" />
```

With this:

```html
@vite(['resources/scss/app.scss', 'resources/js/app.js'])
```

Then run php artisan serve and head to `http://localhost:8000` to view our new page.

## What next

From here you can start building your app by creating a layout blade component that other pages can reuse, then create reusable components following the HTML examples in the [GOV.UK Design System](https://design-system.service.gov.uk/components/).

<a href="https://stocksnap.io/photo/bigben-night-LWRWOL8KSV">Photo</a> by <a href="https://stocksnap.io/author/negativespace">NegativeSpace</a> on <a href="https://stocksnap.io">StockSnap</a>
