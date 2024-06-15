---
title: Building a landing page for your book
description: How to build a landing page for your book
layout: post
hero_image: /img/create-a-promo-page.jpg
hero_height: is-large
hero_darken: true
image: /img/create-a-promo-page.jpg
tags: writing marketing books
series: authors_series
---

This post follows on from my last post about using your website to promote your ebooks. The first step of the article explains that you need to make a website, but didn't go into too much detail. This post aims at explaining how you can build a landing page for your book with Bulma Clean Theme.

I've recently added a new promo page layout which can be used to build a landing page for your book. You can see a demo page here.

To make it easier to get started I have created a repository that you can fork to get started. Don't worry if you don't understand the jargon right now, we will walk through the set up step by step.

## Creating a GitHub account.

If you don't have a GitHub account then you can sign up for one for free. From the [github.com](https://github.com/) homepage, press the Sign up button on the top right and follow the instructions.

## Forking the repository

Rather than starting from scratch, I have create a starter repository that you can use to build from.

Go to the [example-promo-page starter repository](https://github.com/chrisrhymes/example-promo-page) and click on the `Fork` button towards the top right of the page.

Give your fork a name and press `Create fork`.

## Making changes

With GitHub you normally clone the code, edit your content on your computer and then use git to commit your changes and push them back up to GitHub. Don't worry. To simplify the process, we are going to use the 'Edit in github.dev' editor.

To start the GitHub.dev editor, press `.` whilst viewing your fork in GitHub. More information is available on the [GitHub docs](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor).

You should see an editor appear with the list of files on the left of the screen.

## Edit the configuration

The site wide settings are stored in the `_config.yml` file. Edit the following.

- title - set this to your author pen name
- description - set this as a description of your website.
- base_url - set this to `""`

## Add images

Go to the img folder and add an image for your avatar. A square cropped image about 400px wide by 400px high should work well here. In this tutorial we will call the image `author.jpg`. Drag and drop the author image into the img folder.

Now add an image for your book cover. An image cropped to a 800px wide by 1277px high. This is a 2 by 3 image ratio that seems to work well for book covers. Once you have your cropped image you can drag and drop this into the img folder too. Let's call this image `book-cover.jpg` for this tutorial.

## Update the index.md page

The index.md page is your homepage. There is a section called front matter that is between the two sets of `---`. These are the settings and configuration for the page. Below the second `—--` is the page content that is used for the about section.

1. Update the title and subtitle for your book. Use the title for your book name and then the subtitle as your author pen name.
1. Update the hero_image to the path to your book cover image file that you added to the img folder. As we named it book-cover.jpg, we need to set this to `/img/book-cover.jpg`.
1. Update the hero_image_alt text to the name of your book.
1. Update the hero_link to the link to where you sell your book, such as the amazon store page.
1. Update the snippet text. This should be a short description of your book.
1. Update the about_image to our author image, so we need to set it to `/img/author.jpg`.
1. Edit the content of the page (below the second `---`) and write about yourself and your books. This content is written in [markdown format](https://www.markdownguide.org/basic-syntax/).

For full instructions on this page take a look through the documentation for [creating a promo page](https://www.csrhymes.com/bulma-clean-theme/docs/promo-pages/creating-a-promo-page/).

## Reviews

To add a few reviews, edit the `_data/reviews/book1.yml` file. More information is available on the [reviews documentation page](https://www.csrhymes.com/bulma-clean-theme/docs/products/product-reviews/).

## Newsletter

To add a newsletter form, edit the `_includes/newsletter.html` file. This file has a placeholder form that doesn't do anything. Copy the code from your form provider for your mailing list, such as Mailchimp, and paste it over the form in the newsletter.html file.

## Saving changes

Ensure that you have saved all your changes on each individual file by using `cmd + s` for Mac or `ctrl + s` for Windows.

Next, go to the source control tab on the left menu. You should see a list of the files that have been changed. Add a message into the top input box, something like ‘Initial setup' and then press the `Commit  & Push` button. This will commit your changes to your GitHub repository.

## Deploying your site

We are now ready to deploy your site. It's up to you where you host your site but I would recommend a service that integrates with GitHub which will automatically deploy your changes each time you `Commit & Push` to GitHub. One such service is netlify, but there are a range of options available. Take a look at the [Jekyll deployment documentation](https://jekyllrb.com/docs/deployment/third-party/) for more information.

## Domain Name

Hopefully you now have a working promo page for your new book. The next thing to do is get your DNS set up. How you do this depends on your choice of hosting, so take a look at the service you have chosen for getting the domain name set up.

Alternatively, work with a web developer to help get this configured for you.

## What's next?

As stated at the beginning of this article, the promo page is powered by Bulma Clean Theme and has all the built in functionality.

It has a blog page and a demo post that you can use to start blogging. Take a read through the [Jekyll Posts documentation](https://jekyllrb.com/docs/posts/) to get started with blogging.

You can also [customise the colour scheme](https://www.csrhymes.com/bulma-clean-theme/docs/getting-started/theming/#setting-the-primary-colour) to suit your branding requirements.

Take a read through the [Bulma Clean Theme documentation](https://www.csrhymes.com/bulma-clean-theme/docs/) to see all the options available.
