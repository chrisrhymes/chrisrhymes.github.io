---
title: Updating my website's theme
subtitle: Moving from Bulma to TailwindCSS
description: Updating my website's theme using TailwindCSS and away from Bulma
layout: post
hero_image: /img/about-hero.jpg
hero_height: is-large
hero_darken: true
image: /img/about-hero.jpg
tags: webdev jekyll tailwindcss
---

As a web developer, your own website can act as a portfolio for your work, showcasing all of your other work and projects, but sometimes it is the last thing that gets the attention it deserves. I decided that my website needed a facelift, and I decided to move away from my old theme. 

## Bulma-Clean-Theme

I first built [bulma-clean-theme](https://github.com/chrisrhymes/bulma-clean-theme) to power my own website in September 2018. I would say that being able to use the same theme for over eight years is a sign of success. The theme has been downloaded over 130 thousand times from the Ruby Gems directory and I have released many versions with tweaks and changes, along with many contributions from other developers that have helped make it such a success. 

But... 

The Bulma CSS framework hasn't had a new version released in over a year now. It works well, but it feels like it is time for me to look at alternatives and something that will offer me more flexibility to do my own thing. 

Bulma-clean-theme is still available to use, but I wanted to make my own website how I want it to be. 

## TailwindCSS

One of the other themes I had been working on occasionally was [Purpletual blog theme](https://purpletual.netlify.app/) that used TailwindCSS. This is a simple blog theme (with lots of purple) but uses PostCSS to compile the TailwindCSS code. It was a starting point for me to learn how to use TailwindCSS. 

I have since used TailwindCSS in other work projects and it took me a little while to get to grips with it, but once you are familiar with the utility classes it feels like second nature. I decided that this was what I wanted to use on my own website. 

## Design

I'll be honest, I'm not really a web designer. I would class myself as a developer first and foremost. But what I like about TailwindCSS is that it's easy to try things out, easy to prototype something and see it come together bit by bit. 

I started looking at the [TailwindCSS showcase](https://tailwindcss.com/showcase) page and found some aspects of designs that I liked. What's great with TailwindCSS is that you can inspect the page that others have built and see the styling building blocks by simply reading the utility classes. I found this really inspirational and gave me some ideas for my own website design. 

One nice little feature was the background image fixed (the `bg-fixed` class), which I used on medium and up screen sizes on the hero image. This is a little nod back to late 2000's when parallax scrolling was all the rage. Back then we used a variety of jQuery libraries to achieve the effect, but now it's all in one CSS class. Amazing how things have changed. 

## Final design? 

So is this the final design? I would say no, at least for now. Doing this upgrade has allowed me to build a new design, but it also allows me to experiment with the design going forward and enhance it more. The old theme did a great job, but now I can spend some time building something more unique and improving my web design skills over time. 

One last thing...

I just wanted to say thank you to bulma-clean-theme and the 8 years it has served me powering my website, but it seems nothing stays the same in web development forever. 