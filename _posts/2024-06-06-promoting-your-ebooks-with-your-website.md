---
title: How to promote your ebooks with your website?
description: Tips for promoting your books and ebooks with your website
layout: post
hero_image: /img/books-hero.jpg
hero_height: is-large
hero_darken: true
image: /img/books-hero.jpg
tags: writing marketing books
---

I'm a web developer by trade and a part-time author, so here are a few things that I have done to help promote my books and ebooks using my website and my tech know how from my day job.

## Build a website

If you don't have a website, then start by building one. Easy huh?

At the very least, start with a single landing page so you have a presence on the internet when people search for your name or book title. From here you can direct people to where your book is sold and your social media sites so people can be kept up to date.

I built a website, this website in fact, partly to promote my books, partly to promote my work.

This site is built using [Bulma-Clean-Theme](https://github.com/chrisrhymes/bulma-clean-theme), a Jekyll theme that includes product listing pages that you can use to promote your books. If you are interested in development then this may be a way for you to go, but if you aren't then take a look at site builders or something in between such as WordPress.

The biggest benefit to me of using Jekyll is that I can host it for free with [GitHub pages](https://pages.github.com/) or [Netlify](https://www.netlify.com/), whereas site builders normally come at a monthly cost. There is also no hassle with maintaining a web server as it is a static site. This means the HTML pages are generated into static HTML files and deployed somewhere, in my case GitHub Pages. The way I see it, if you are able to save some money on your website, then you have more to spend elsewhere.

Do what works for you. Pick a solution that is easiest for you to maintain and update, that way, you won't be put off from making regular updates to your site and it will become part of your routine. Updating little and often, rather than overhauling everything every couple of years, is generally better as return visitors will be encouraged to come back more often and see what is new.

## Register a domain name

Once you have your site up and running you need to register a domain name for your website and point it at your new website. Ensure that you own the domain name and not a third party, such as a developer or an agency.

You also want to ensure that you can update your domain name settings so you can point it somewhere else in future, such as to a different website host, if you want to move your website. You don't want to be stuck and have to buy a new domain in future and have to start all over again.

Your domain should be concise and easy to type in the address bar. This makes it easier for return visitors to check back at a later date without having to rely on a search engine.

## Create a blog

I've found that a good way of getting visitors to your new site is to create a blog. Like this one! Most of the traffic to my website comes from the blog posts. Once people land on your site they can look around and see what else is on your site.

You can always link to your [books](https://www.csrhymes.com/books) from your blog post (see what I did there) which will help visitors to your blog post find your books.

I have heard people say they want a blog, but then I ask them what are they going to write about. They create a single post and then never use it again. I'd suggest writing a list of possible blog post topics and pick the one that you are most excited to write about. If you are excited to write about it then others will be excited to read about it.

Every time you have a new idea for a blog post, ensure you write it down somewhere, otherwise when it actually comes to writing the post, you will be sat in front of an empty screen whilst you try to remember what your great idea was. I use the notes app on my phone to keep my list.

## Add interesting titles and meta description tags to your pages

Spend some time thinking about the title and meta description for your page. These appear in the `<title>` tag and `<meta name=“description”>` tag in the `<head>` part of the HTML. This is normally used by search engines results so this is what people that find your site see, so it needs to encourage people to click on that result instead of one of the other links.

Take a look at some best practices for descriptions on the [Google Search documentation](https://developers.google.com/search/docs/appearance/snippet#meta-descriptions).

The tile is also used when sharing your link on social media sites. You can go one step further for social media and add additional tags specific to Facebook and X (formerly Twitter), known as [OpenGraph](https://ogp.me/).

I use the Jekyll SEO tag plugin to automatically generate the meta tags for my site, but there are also plugins for WordPress to help you generate these tags.

## Tell Google and other search engines

You may be lucky and a search engine may stumble upon your website, but why not give it a head start and tell search engines it exists. This can be done through [Google Search Console](https://search.google.com/search-console/about). You provide the url of your site and then verify that you own it, either through adding a meta tag to the code, uploading a file, through Google Tag manager or Google Analytics, or by adding a DNS record. Sounds complicated, but it's definitely worth doing.

Once you have verified you own the site, you can then submit your sitemap. The sitemap tells Google about all of your site's pages so it knows they exist and can then crawl the pages and then display them in search results.

So what is a [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)? It's an XML file in a particular format that provides a list of your websites pages. Jekyll and WordPress have plugins to create a sitemap for you so you don't have to manually write out a load of XML and keep it updated.

Each time you add a new page, such as when a new book page or a new blog post is added, it is added to your sitemap and Google should then index the page next time it reads your sitemap.

## Add your website address to your social media profiles

People looking at your posts and profile will want to know more about you, so provide them with a link in your profile back to your website. This is especially useful if the social media site shows your public profile to search engines. Each link back to your site helps boost its rankings in search engines.

## Share your blog posts on social media

When you have spent so much time writing a blog post, ensure you share it with others. One thing that caught me out, but is probably obvious to most users these days, is that some social sites don't allow links. Instagram is one example of this. So maybe concentrate on X (formerly Twitter), Facebook, LinkedIn and Threads for sharing links.

## Sharing to other sites

I first got real traction for my blog posts after sharing to another site, who then promoted my blog post for me. In my case, the posts I tend to write are about my day job as a web developer using Laravel and JavaScript. I discovered Laravel News, which allows you to submit your links to their site.

Approved links then get published to a [Community Links](https://laravel-news.com/links) section on their site, but even more importantly, they also share the links on their social media profiles too, as well as sharing the links in a weekly email to their large subscriber base.

Remember to pick sites that are relevant to your subject matter to share to, so don't submit non Laravel related blog posts to Laravel News.

I am still looking for a site that allows authors to share their blog posts with other authors and readers. If you are aware of one then please let me know!

## Share your blog's RSS feed

Most blogs allow you to generate an XML feed that can be read by other sites to provide links back to your site. Again, for Jekyll, there is a plugin that lets you create a feed for your posts and WordPress has it as a default feature.

As a developer, I found [dev.to](https://dev.to/chrisrhymes), which allows you to import posts from your website's feed. The added bonus of this is that it sets a tag telling search engines that the post was originally created on your website. This is called a [canonical link](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#rel-canonical-link-method) and helps tell search engines where the content originally came from.

[Medium.com](https://medium.com/@chrisrhymes) also allows you to import posts from my website's RSS feed, again with a canonical link pointing back to your website.

## Tell people about your site and your books

Last but not least, tell people in real life. I have to admit I am terrible at this. I have found that your website and blog will quietly sit there unused unless you go out of your way to tell people about it.

You should be proud of what you do and want others to read about it.

Add your website address to your business cards, email signature, wherever you can think of.

## Hope that helps

Hopefully there are lots of ideas there to get you started and give your website and blog a boost to help give your books some more visibility.

If you have found this article useful then check out “[How NOT to make a Website](/products/how-not-to-make-a-website)” by C.S. Rhymes for more information on what not to do when building a website.
