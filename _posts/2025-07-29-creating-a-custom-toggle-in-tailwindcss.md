---
title: Creating a custom toggle in TailwindCSS
description: How I created a custom toggle switch in TailwindCSS
layout: post
hero_image: /img/tailwindcss-toggle.jpg
hero_height: is-large
hero_darken: true
image: /img/tailwindcss-toggle.jpg
tags: webdev css tailwind
---

I've only just started using TailwindCSS, (I know late to the party huh), and I wanted to create a custom toggle switch that looked a bit nicer than a standard checkbox. This blog post goes through some of the thought processes and the tools that Tailwindcss v4 has out of the box that you can make use of.

## Starting with the Checkbox

As I said, I wanted a checkbox to look nice, but what was really important to me was that it could still be used as a checkbox so it would be usable with a keyboard and work with Livewire, so when the state was updated the page would also update.

```html
<label>
  <input type="checkbox" />
</label>
```

I also wanted on and off labels to indicate what was changing when the checkbox was checked or unchecked.

```html
<label>
  <input type="checkbox" />
  <span>Off label</span>
  <span>On label</span>
</label>
```

## Basic styles

I have added some basic styles to make the labels appear side by side using flexbox, round the labels edges, and added the background colour of violet-700. The off label has a white background and the on label has a violet background to match the label background colour.

Next we want to hide the checkbox from view, but still keep it in the page and make it visible to screen readers. We can use the [sr-only](https://tailwindcss.com/docs/display#screen-reader-only) utility for this.

```html
<div class="inline-flex">
  <label
    class="cursor-pointer flex flex-row rounded-full bg-violet-700 px-2 py-2"
  >
    <input type="checkbox" class="sr-only" />
    <span
      class="mr-2 inline-flex cursor-pointer rounded-full bg-white px-4 py-2 text-black"
      >Off label</span
    >
    <span
      class="inline-flex cursor-pointer rounded-full bg-violet-700 px-4 py-2 text-white"
      >On label</span
    >
  </label>
</div>
```

## Using peer

I need the style of the labels to change based on the state of the checkbox. So if the checkbox was checked then the 'On label' should be prominent, but if it was unchecked then I wanted the 'Off label' to be prominent.

Tailwind has a [peer](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state) utility that allows you to style based on a sibling's state. This was perfect for my needs.

We can add `peer` to the checkbox class:

```html
<input type="checkbox" class="peer sr-only" />
```

Then we can add the styles for the checked state for the off label using
`peer-checked:` to swap the text colour and background colours so it has a
violet background and white text when the checkbox is checked.

```html
<span
  class="mr-2 inline-flex cursor-pointer rounded-full bg-white px-4 py-2 text-black peer-checked:bg-violet-700 peer-checked:text-white"
>
  Off label
</span>
```

Then we do the opposite for the on label by making the background white and the text black when the checkbox is checked.

```html
<span
  class="inline-flex cursor-pointer rounded-full bg-violet-700 px-4 py-2 text-white peer-checked:bg-white peer-checked:text-black"
>
  On label
</span>
```

Now when we click to check and uncheck the checkbox, the highlighted label will also update to reflect whether the checkbox is checked or not.

We can also use the keyboard to focus on the checkbox using tab, then use space bar to check and uncheck the checkbox input, changing the label appearance.

## Adding an outline with focus-within

It's always useful to indicate the focus state of an input, especially for keyboard users. But in our case we have hidden the checkbox, except for screen readers so how can we show the element is focused?

Again, Tailwindcss has you covered with the [focus-within](https://tailwindcss.com/docs/hover-focus-and-other-states#focus-within) utility that lets you apply styles to a parent element when the focus state is within the parent.

We can add an amber outline by using `focus-within:` on the outer label.

```html
<label
  class="cursor-pointer flex flex-row rounded-full bg-violet-700 px-2 py-2 focus-within:outline-4 focus-within:outline-amber-400"
>
  <!-- Input content here -->
</label>
```

Now when we focus the state by clicking with the mouse or selecting the checkbox with the keyboard then the outline appears.

## Adding a transition

To make the transition between the on and off states a bit smoother and animated we can use Tailwind's [transition](https://tailwindcss.com/docs/transition-property) utility and add it to both spans.

Here we add `transition-all duration-700 ease-in-out` to tell tailwind to transition all items with a duration of 700ms and using ease-in-out transition timing feature.

```html
<span
  class="mr-2 inline-flex cursor-pointer rounded-full bg-white px-4 py-2 text-black transition-all duration-700 ease-in-out peer-checked:bg-violet-700 peer-checked:text-white"
>
  Off label
</span>
```

## Final example

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KwdNZMy" data-pen-title="Untitled" data-user="chrisrhymes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chrisrhymes/pen/KwdNZMy">
  Untitled</a> by CS Rhymes (<a href="https://codepen.io/chrisrhymes">@chrisrhymes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Further improvements

This focuses purely on the styling, but I think further work would be needed to make this fully accessible by adding additional aria attributes to indicate to users the current state of the checkbox.

<a href="https://stocksnap.io/photo/night-cityscape-7AVEXUYJHQ">Photo</a> by <a href="https://stocksnap.io/author/candacemcdaniel">Candace McDaniel</a> on <a href="https://stocksnap.io">StockSnap</a>
