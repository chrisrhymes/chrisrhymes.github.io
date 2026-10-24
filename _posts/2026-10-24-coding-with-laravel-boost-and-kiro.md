---
title: Coding with Laravel Boost and Kiro AI
description: My first impressions of coding with Laravel Boost and Kiro AI
layout: post
hero_image: /img/coding-with-laravel-boost.jpg
hero_height: is-large
hero_darken: true
image: /img/coding-with-laravel-boost.jpg
tags: webdev laravel AI
---



I recently built a Laravel app using Laravel Boost along with Kiro, Amazon's AI service, and wanted to share what I discovered. This is more of an opinion piece as I try to put into words what I think about the new way of developing. This reflects my current thinking and I'm absolutely sure that each developer will have a different experience than mine.

## The set up

I started by creating a new Laravel project with the [Laravel installer](https://laravel.com/framework/docs/13.x/installation#installing-php). I selected the Livewire option as that was what I was already familiar with.

I then installed [Laravel Boost](https://laravel.com/framework/docs/boost) as a composer dev dependency and ran the install command, selecting Kiro as my AI tool. This created all of the files needed for the AI to know about Laravel and its recommended way of working.

I then set up [Kiro in PHP Storm](https://kiro.dev/docs/cli/acp/#jetbrains-ides) with the ACP so I could write the prompts directly in the IDE.

## The first step - database

I started with the same process I would with other apps I've built in the past, with the database models and migrations. I suppose I could have just written a prompt as to what I wanted to build and let it go and fill its boots, but I wanted to control the database structure. From past experience, getting the database structure and the relationships right early makes everything else easier down the line. I guess I just didn't trust AI to do it how I wanted it.

Laravel makes it pretty easy to get started with the scaffolding by allowing you to create a model, migration and factory with a single artisan command. I ran the commands, defined the tables in the migrations and then created the relationships in the models.

## Getting the AI involved

Now I had a foundation for the database schema in place, I asked the AI to create Livewire components and forms for each of the models. I did this for each model one by one so I could see what the output was and judge the changes it made. As part of the prompt I told it to use the database migrations to know what fields to create in each Livewire form, and I also asked it to use Livewire Flux UI (that was installed by default anyway) to build each form interface.

The AI spat out a load of text into the chat window as it processed what I had asked it to do and started reading all the files in the project. I tried to keep up with the text, but it was outputting text too fast for me to read and often disappeared anyway after it had come to some kind of decision. I'm not really sure of the point of all that, I guess it's instead of just showing a loading spinner? Maybe it looks more impressive to spam a load of text so fast you can't read it. Anyway, I quickly gave up reading most of the text and waited for the text at the end that summarised what it did. The summary was still quite long, but it was broken into steps so you could skim read the bullet points if you wanted to.

Interestingly, the AI asked for permission to do certain tasks, such as reading files and searching. After the first few times I just pressed ‘Yes', but I always liked to take time and read what it was asking when it came to running scripts in the terminal. Just out of an abundance of caution.

Long story short, (too late), it produced a clean looking interface using Flux UI and it mostly worked. It was surprising how little information I had to provide to make it build something. It seemed that having something for it to reference is key and having all the rules or guardrails in Laravel Boost helped steer the output to what I was familiar with.

Once the AI had produced a component I could then provide another prompt to ask it to make a specific change to the component without giving it too much detail. It seemed to follow on from the previous prompt, using the existing context from the chat session. It allowed me to try things out and see the changes quickly without being too caught up in how long it would take to code it and take a prototyping kind of approach to get what I wanted.

## Tests and formatting

One thing that I really liked about Laravel boost is that it instructs the AI to automatically write tests to confirm what it built works. I always write tests to ensure things work the way they should, but also to help document the functionality so future code changes would flag a change in behaviour. But writing tests can become laborious, so the AI writing them was definitely a bonus for me. It used PEST to write the tests which is also another win as they are written in a very fluent style so it was easy to read through the tests that had been written and quickly understand what they were doing.

One thing I would say, if I were writing the tests myself I would have spent a bit longer writing more reusable tests and passing in datasets to test the different inputs and outputs. The AI could write tests so fast that I guess it's easier for it to create simpler tests, but more of them. I'm wondering if that could lead to greater technical debt in future?

It also ran Laravel Pint after each change, ensuring the formatting is what you would expect, keeping the code easy to read and consistent. I normally set up a pipeline to do this when I push code up to the remote repo, but having it format as you go is very useful.

## Making manual changes

When trying out the user interface, I noticed a couple of things that weren't quite right, so I jumped into the code myself and then made some changes. I then prompted the AI to add some extra functionality to the same Livewire component. It suddenly seemed confused that the files didn't match what it was expecting. I can't remember the exact wording, but it seemed very possessive over the files and like it wanted to discourage anyone else making changes to the stuff it had output.

This was a bit of a shock to be honest. I wanted a tool that would work with me, not do everything for me. Once it had reindexed the updated files it got over itself and made the relevant changes.

## Folder structure

What I like about working with Laravel is the folder structure. It has a convention that has changed slightly over the years, but it is pretty consistent. For example, if you run an artisan command to create a notification, it will put it in a Notifications directory in the app directory.

Laravel Boost helps the AI follow that convention, meaning if you are new to the project you can find what you are looking for quickly and start making changes. This is a massive efficiency gain that is often overlooked.

I have to say, after looking at some other projects that are more towards being vibe coded, the consistency and structure is missing. If you open up the codebase you'll have to spend a lot of time to figure out where everything is before you can start working on it.

I sometimes wonder if this is deliberate, that AI puts things in different places in different projects so that you are more inclined to use AI to make changes in future, guaranteeing its future business model?

## Comments, lots and lots of comments

I like to write a few comments here and there in the code, but AI seems to love comments. It's an LLM after all, so writing chunks of text is what it does best. But AI seems to write way too many comments to me.

After considering this for a moment, I realised that AI has a finite memory. If you close a chat session and start a new one, it needs to relearn your codebase all over again. Laravel Boost helps it understand the structure, but the business logic is a mystery to it. Writing loads of comments is like its way of dumping its decision making into the code, so that next time it does something it can read through all the comments and remember why something was done that specific way.

Developers definitely work like that too with comments by adding notes for themselves and others in future, but once you become familiar with a project you remember why things are done a certain way. You've been in the meetings with the customer when the business decisions are made, but AI doesn't have that ability. Well, maybe that's the next evolution of what's to come…

Part of being a good developer is writing code that is readable. To me, this helps reduce the need for so many comments. This is where real world developer experience can count.  

## So what did I think overall?

It was certainly quick to create new components and tests. It seemed to produce consistent and readable code, but I think that is more due to the Laravel way of doing things and the AI following the standards set out in the Boost package.

But was it fun? 

I have to say no. It definitely made things easier, but the difficult bits are what make a job worth doing. There is a lot of job satisfaction to be had in working through a problem and finding the best solution. That part of the job is now reduced with AI.

The following quote seemed to resonate with me when thinking about how AI coding works.

> "It's not the destination, it's the journey"

The journey is what makes great software and AI seems to jump straight to the destination.

I tend to first build something that works, but then spend more time afterwards enhancing and optimising it. This part of the process, this part of the struggle, actually provides inspiration for how something could be further improved. It gives your mind time to think about the possibilities, making those minute decisions as you go along that end up with a great result.

Maybe the developer being the bottleneck was a good thing after all? 

<a href="https://stocksnap.io/photo/boston-airport-KVDROEGWGZ">Photo</a> by <a href="https://stocksnap.io/author/mattmoloney">Matt Moloney</a> on <a href="https://stocksnap.io">StockSnap</a>