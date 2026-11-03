---
title: Development work
subtitle: Some examples of my web development work
description: Check out examples of my dev work
layout: default
permalink: /dev-work/
links:
  - title: Jekyll Themes
    url: /themes/
    image: /img/about-hero.jpg
  - title: Packages
    url: /packages/
    image: /img/bulma-block-list.jpg
  - title: Sites
    url: /sites/
    image: /img/brackley-routes-16by9.jpg
  - title: Demos
    url: /demos/
    image: /img/vue-games.png
---

<section class="my-8">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {% for item in page.links %}
        <a
            href="{{ item.url }}"
            class="block hover:outline-2 hover:outline-amber-400 focus:outline-2 focus:outline-amber-400"
        >
            <figure class="aspect-16/9">
                <img src="{{ item.image }}" alt="{{ item.title }}" />
            </figure>

            <footer class="px-2">
                <p class="">{{ item.title }}</p>
            </footer>
        </a>
        {% endfor %}
    </div>
</section>