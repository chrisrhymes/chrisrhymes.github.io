---
title: Fixing a few SEO issues with my author website
description: How I fixed a few Search Engine Optimisation issues with my website
layout: post
hero_image: /img/fixing-seo-issues-author-website.jpg
hero_height: is-large
hero_darken: true
image: /img/fixing-seo-issues-author-website.jpg
tags: webdev author seo
---

When I launched my cozy mystery series, The Little-Astwick Mysteries, I decided to create a new website to promote it. But I made a few mistakes with SEO that have led to a few issues with Search Engine Optimisation (SEO). Here is how I fixed them.

## www or non-www subdomain

The site is built using Jekyll, which has a `_config.yml` file where you can specify your `site_url` that is used to build all the links and the sitemap. I set the site_url to [www.littleastwick.co.uk](https://www.littleastwick.co.uk), but the configuration in Netlify was set to use littleastwick.co.uk (without the www) as the primary domain.

### What was the impact?

A simple mistake, but it meant lots of redirects from the www addresses to non-www addresses and a conflict between the generated sitemap file and the pages being served to visitors.

Search engines see each sub domain as a separate site. So www.littleastwick.co.uk is a different site to littleastwick.co.uk.

In essence, I was telling search engines a list of urls on one subdomain, but when Google tried to crawl them it would be redirected to another domain (the non www domain).

### How was this fixed?

I host my site with Netlify. This was fixed by updating the 'Domains configuration' in Netlify to set the www address as the primary domain. Netlify now directed visitors to the pages with the www prefix and the sitemaps matched the subdomain correctly.

![Netlify domain configuration](/img/netlify-domains.jpg)

Of course, this is just for Netlify. The way to resolve this will vary depending on your hosting provider. Some have easy to use settings, whereas others may require you to edit configuration files. You may also need to update DNS (Domain Name System) settings to fix this issue, so check with your provider or speak to a developer, before you change anything.

### Pitfalls avoided

The other saving grace with this was that Netlify is clever enough to only serve the site on one of the domains. If it was served on both then Google may have seen both sites and listed them separately in the search results or thought the site was duplicating content on purpose.

## Permalinks

Jekyll has the option for you to set the [permalinks](https://jekyllrb.com/docs/permalinks/) of your pages. This is the format of the url for the generated page. For blog posts it could have the year, month and day of the post in the url. For normal pages it defines if the page should end in a forward slash `/` or `index.html` or `custom-page-name.html`.

I didn’t set a value for the permalinks thinking it all worked and was ok with whatever defaults Jekyll decided to use.

What I didn't realise was that Netlify allowed you to visit the url ending in .html, but also visiting the page without the .html, or the url that ended in a forward slash. Some pages in the site directed visitors to the page without the .html, but the sitemap pointed search engines to pages with the .html.

### What was the impact?

The result of this was lots of pages with duplicate content. Many pages had canonical urls redirecting search engines to the page with .html. A canonical url is a way of telling search engines what the true source should be and what you prefer to be shown in search results.

### How was this fixed?

My resolution to this was to add `permalinks: pretty` to the `_config.yml` file. This meant the links in the built site and the sitemap now all end in a forward slash instead of .html.

I am fully expecting there to be some fall out of this in the short term as search engines will have to reindex the site again with the updated urls, but hopefully it should resolve these issues in the long term.

### Potential pitfalls avoided

The bonus is that if someone visits an old link with the .html suffix, then it redirects the page to the new permalink ending with the forward slash suffix. Search engines should see these redirects and hopefully update their indexes over time to use the updated url.

## 404 page

Whilst I was testing all this out, I also realised that I didn’t have a 404 page for my site.

### What was the impact?

If someone had visited a broken link, there wasn't any links for them to easily get to where they needed to be or to easily get to the homepage, just a standard Netlify error page.

### How was this fixed?

This was resolved by creating a new custom `404.html` page that used the default page layout. This meant it had the header and footer links to be able to navigate to other pages on the site and it had a message stating that it was a 404 error.

There are different settings needed depending on your hosting, so check out the [custom 404 documentation](https://jekyllrb.com/tutorials/custom-404-page/).

## Conclusion

Hopefully these changes should lead to both a better user experience and a better configured site for search engines to be able to determine what the actual url should be.

I'm going to keep my eyes on the [Google Search Console](https://search.google.com/search-console/about) over the next few weeks and see what other items are raised. If you haven't yet set up Google Search Console, then I recommend you do. It has performance reports to show you how visitors are finding your site, but it also has really useful reports for potential SEO issues with pages it finds.

Ensure you add your sitemap.xml file (create one if you don't have a sitemap yet) to Google Search Console so it can easily find all your site's pages and be informed when you create a new page too.

I may need to add some manual redirects from old urls to new urls, but luckily there is a [Jekyll redirect from plugin](https://github.com/jekyll/jekyll-redirect-from) that I can use for that.

What I have learned is to spend more time on the configuration details. This site is quite small and does not many pages, but making these changes on a larger site could result in a much bigger impact to its search rankings and take longer to resolve.
