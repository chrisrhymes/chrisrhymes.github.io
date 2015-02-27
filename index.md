---
layout: page
title: Welcome
permalink: /
---

<div class="row homepage-banner">
<div class="small-12 medium-5 columns text-center white shadow">
  <i class="fa fa-terminal fa-5x"></i>
  <h2 class="white shadow">Developer</h2>
</div>

<div class="small-12 medium-2 columns text-center white shadow">
  <h2></h2>
  <i class="fa fa-plus fa-3x"></i>

</div>

<div class="small-12 medium-5 columns text-center white shadow">
  <i class="fa fa-book fa-5x"></i>
  <h2 class="white shadow">Author</h2>
</div>
</div>

<h3>My Mission</h3>

> Making effective, modern, responsive websites and helping others do the same!

Hello and welcome! My name is C.S. Rhymes and I'm a full time web developer and a part time author. I've written a couple of [books](/books/ "Check out my books") that are available on the Amazon Kindle store. 

I also write a [blog](/blog/ "Check out my blog") with technology, web and other random topics, so make sure you check it out too.



<hr>

<h2 class="text-center">My Books</h2>

<div class="small-12 medium-6 columns">
<ul class="pricing-table">
  <li class="title"><h3 class="white">How NOT to make a Website</h3></li>
  <li class="price">&pound;1.99</li>
  <li class="description">What I have learnt from over seven years’ experience of working on websites is that there are many things to avoid when making your website, in a sense, I have learnt How NOT to make a website. </li>
  <li class="bullet-item"><img src="/img/how-not-to-make-a-website-cover-2.jpg" /></li>
  <li class="bullet-item">Aimed at website beginners, not developers</li>
  <li class="bullet-item">Perfect for business owners and website owners</li>
  <li class="bullet-item">Written in a non technical way with easy to understand examples</li>
  <li class="cta-button"><a class="button" href="http://www.amazon.co.uk/How-make-Website-C-S-Rhymes-ebook/dp/B00KEE3HES/">Buy Now</a></li>
</ul>
</div>

<div class="small-12 medium-6 columns">
<ul class="pricing-table">
  <li class="title"><h3 class="white">How NOT to use a Smartphone</h3></li>
  <li class="price">&pound;1.99</li>
  <li class="description">This book is written for all those people that over the years have shied away from getting a smartphone in the past and their old trusty Nokia 3310 has finally beeped its last polyphonic ringtone. </li>
  <li class="bullet-item"><img src="/img/how-not-to-use-a-smartphone-cover-2.jpg" /></li>
  <li class="bullet-item">Covering smartphone operating systems</li>
  <li class="bullet-item">Apps</li>
  <li class="bullet-item">Common touch screen actions</li>
  <li class="cta-button"><a class="button" href="http://www.amazon.co.uk/How-NOT-Smartphone-C-S-Rhymes-ebook/dp/B00MVB5JOS/">Buy Now</a></li>
</ul>
</div>

<hr>

<h2 class="text-center">Latest Blog Post</h2>

{% for post in site.posts limit:1 %}
<h3><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
<p>Published: {{ post.date | date: "%b %-d, %Y" }}</p>
<p>{{ post.excerpt }} <a href="{{ post.url | prepend: site.baseurl }}">Read more...</a></p>
{% endfor %}


