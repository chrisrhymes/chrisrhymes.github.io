---
title: Adding social icons to the Bulma Clean Theme footer
description: Some more information about the update to Bulma Clean Theme adding social media icons to the footer
layout: post
hero_image: /img/bulma-clean-theme-footer-icons.jpg
hero_height: is-large
hero_darken: true
image: /img/bulma-clean-theme-footer-icons.jpg
tags: jekyll theme bulma
---

Version 1.1.0 of Bulma clean theme has been released. It has a small update that allows you to easily add social media links to the footer of your site.

## Font Awesome update

It sounds like a small feature update, but I wanted to create a blog post about it as it required updating to Font Awesome v6 to get the latest social media icons.

When upgrading to v1.1.0 of the theme, please ensure you take a read through the changes in Font Awesome and see if your site is affected by any of the changes.

[Font Awesome 6 - What's changed?](https://docs.fontawesome.com/web/setup/upgrade/whats-changed)

## Adding social links to the footer

To add social media links to the footer you need to add a social key to your `_config.yml` and add the relevant social network names with links to your profiles.

For example:

```yaml
social:
  facebook: https://www.facebook.com/
  instagram: https://www.instagram.com/
  threads: https://www.threads.net/
  tiktok: https://www.tiktok.com/
  x: https://www.x.com/
  youtube: https://www.youtube.com/
```

For more information take a look at the [theme documentation](https://www.csrhymes.com/bulma-clean-theme/docs/navigation/footer-navigation/#footer-social-links).
