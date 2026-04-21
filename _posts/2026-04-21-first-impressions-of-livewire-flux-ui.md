---
title: First impressions of Flux UI
description: My first impressions using Flux UI Livewire component library
layout: post
hero_image: /img/first-impressions-flux-ui.jpg
hero_height: is-large
hero_darken: true
image: /img/first-impressions-flux-ui.jpg
tags: webdev laravel livewire
---

Recently I had the opportunity to work on a new side project. I had already decided I wanted to use Laravel and Livewire, but I wasn’t sure about the frontend user interface. I had seen some demos of Flux UI and liked what I had seen, so decided to give it a try.

## Installation

First things first, the installation was very easy in a new Laravel app as [Flux UI](https://fluxui.dev/) was installed by default when I selected Livewire as the starter kit using the Laravel installer. This meant I could get started developing straight away.

## Theming

Initially I wasn’t concerned about the styling and kept things standard, but later on I decided to change things up and add some colour. Luckily the Flux UI website has a [tool for building a theme](https://fluxui.dev/themes) and you just need to copy and paste the output into the app.css file, then the changes were shown straight away.

## Local development

This is more of a Laravel feature than Flux, but it was the first time I have used the `composer run dev` command to run the development environment. This made it really easy to get started developing with a SQLite database and the local installation of PHP. No need for docker or Laravel Sail.  This was really handy for me as I was developing on a MacBook Air, rather than my more powerful work machine, and meant I didn’t need to do much set up to get working.

## Auth views and dashboard

So everything was installed and up and running, so I started to build my new Laravel app. The first thing I really appreciated was that the scaffolding and views were all in place for registering and logging in. Great.

Next thing, once I had registered a user I was shown a dashboard starter screen. This had some great features built in, allowing users to manage their profile and a nice sidebar layout where I could add links too. Another worry off my mind!

## Header and Sidebar

Here things slowed down a little at first as I got used to the way Flux UI works. The header and sidebar is built up of a lot of smaller components. This makes them really reusable, but there is quite a lot to take in. I think the Header and Sidebar pages could do with a little more detail in the documentation, helping to explain how on desktop it shows links in the header, then on mobile and tablet it uses the sidebar. Once you get your head around this it’s very easy to use. Other frameworks I’ve used tend to have one menu which has two different sets of styles for mobile devices and desktop screens.

## Forms and inputs

Building a form was very easy using the Livewire methods I was used to and hooking them up to the relevant flux inputs was very simple too, using the flux:input shorthand syntax and passing in the wire:model and the label. What’s really nice is the inputs also handle displaying the validation error messages for you without any extra work.

The app I was building had a couple of file uploads. I saw that there was a File Upload component, but it wasn’t included in the standard Flux UI package. What was great though, was that the standard flux:input allowed you to set the type to file and use this for file uploads. Although it doesn’t have all the features of the pro version of Flux UI, it did allow me to keep building what I needed for now and fits in nicely with the rest of the interface.

## Tables

I also tried out the table component for an index page with a data table. This has a lot of really nice features built in, such as sorting/ordering columns, pagination and sticky headers. The way the component names are namespaced is very logical to me too, so you start off with a flux:table, then flux:table.columns, which have multiple flux:table.column inside.

What I really liked about Flux UI was the fact that it seems to have most standard use cases catered for. You can start with an empty app and quickly and easily build up a user interface that looks neat and tidy and functions well.

## Accessibility

One thing that I am unsure about is the accessibility. Everything seems very small to me, but maybe that’s from my day job working in local government where we try and meet WCAG AAA where possible, making interactive controls at least 44px wide and 44px high. Reflecting on this though, Flux UI has similar look and feel to GitHub for navigation and sidebars, which I use daily without issue. A standard flux:input is around 40px high so it’s not far off the AAA standard, but sidebar links are closer to 30px high so a bit further away from that standard.

I’m pretty sure I could spend some time looking at how to overwrite the default styles in the theme to achieve this if I needed too. Flux UI uses TailwindCSS and again, works really well with it, allowing you to customise the theme and ensure sufficient colour contrast, etc.

## Would I use Flux UI again?

Yes, definitely. You can tell it’s built by the same people that built Livewire. It works so well together and makes building a Laravel app very easy. I like to work on the functionality and features of an app and know that the UI will just work without much hassle. Like I said earlier, there is a bit of learning to do, but once you get your head around it is very logical to use. There also seems to be regular updates and new components and features added regularly which is a great sign for the future. 


<a href="https://stocksnap.io/photo/citylights-buildings-YP7B573GOA">Photo</a> by <a href="https://stocksnap.io/author/burstshopify">Burst</a> on <a href="https://stocksnap.io">StockSnap</a>