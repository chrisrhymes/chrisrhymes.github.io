---
title: Creating a links page with Bulma Clean Theme
description: How to create a links page with Bulma Clean Theme and GitHub Pages
layout: post
hero_image: /img/example-links-page.jpg
hero_height: is-large
hero_darken: true
image: /img/example-links-page.jpg
tags: webdev html links
---

I've seen a few posts recently asking what other authors use for their website. There are many options available, but sometimes you just want a single page with links to your social media profiles and links to your books. This is where Bulma Clean Theme and GitHub pages can come to the rescue. 

The below may seem a bit of a different workflow to begin with from other website builders, as it is defining content and configuration in files instead of through a user interface. It will get easier and more familiar the more you use it.

Here is an [example Links Page](https://www.csrhymes.com/LinksPage/), showing what we will achieve by the end of this article.

## Forking the LinksPage repo

- Create a GitHub account (if you don't already have one)
- Head over to `https://github.com/chrisrhymes/LinksPage` 
- Press the `Fork` button at the top right
- Select your user as the owner
- Your repository must be named `<user>.github.io`, replacing `<user>` with your username. 
- Press `Create fork`

## Editing your site

So now you have a bunch of files in your repo, but these have sample content in so we need to modify the files to have your content. 

We can open up a code editor in [GitHub Codespaces](https://docs.github.com/en/codespaces/developing-in-a-codespace/developing-in-a-codespace). On your repo's code tab, click the green Code button, then select the Codespaces tab, then click the `+` to create a new codespace. If you already have a codespace running then select it from the list. 

### Create an images folder

Create a folder for your images in the root of your repo called `images`. You can upload the images for your site into this folder and reference them from the other pages using `/images/image-file-name.jpg` style of paths.

### Update the _config.yml file

The _config.yml file contains the sitewide settings for your site. 

- Update the title to your author name or pen name
- Update the description to describe your books
- Update the baseurl to be empty `"""`
- Update the list of social networks to point to your profile pages

### Update the index.md file

This is the file for your homepage. It has a section at the top which is called front matter, which is the configuration for the page. The front matter is contained within the `---` at the top and the bottom. Below the second `---` is the page content and can be written in markdown format.

This page uses the links layout from Bulma Clean Theme. The front matter is written in yaml format. 

Have a read of the [Links page documentation](https://www.csrhymes.com/bulma-clean-theme/docs/links-pages/creating-a-links-page/) on the Bulma Clean Theme website for full instructions, but essentially the links are broken into sections so each section of links can have a title and then a list of links below. 

```yaml
link_sections:
- title: The section title
  links:
    - name: Read the docs
      link: /docs/
      image: https://picsum.photos/id/69/300/300
      image_alt: An example image
    - name: Read the Blog
      link: /blog/
      image: https://picsum.photos/id/70/300/300
      image_alt: An example image
```

### Commiting the changes

Once you are happy with your changes to your files, you need to add and then commit the changes to the GitHub repo. 

Follow the instructions for [how to commit changes in a GitHub codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-source-control-in-your-codespace#committing-your-changes)

## Setting up GitHub pages hosting

Once you have made your content changes, you will want to set up the hosting for your page using GitHub pages. We are using GitHub actions to build and deploy the site. This means it will automatically trigger a rebuild each time you commit the changes to your main branch and then deploy the changes.

- Go to the `Settings` tab from within your freshly forked repositiory
- Select `Pages` from the left side menu
- Under `Build and deployment` select `GitHub Actions` from the drop down
- It should build your site using the built in GitHub Actions workflow
- When it has finished, it should have a link at the top of the Pages settings page

## Adding a custom domain

The site will be available on `<user>.github.io` but you probably want to configure a custom domain name. 

This will vary based on your domain and the provider. Take a look through the GitHub documentation for [how to set up your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

You should now have your links page up and running and have somewhere you can add links and share on your social media profile pages. 