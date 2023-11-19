---
title: First impressions of React Native as a Web Developer
description: My first impressions of React Native as a Web Developer
layout: post
date: 2023-11-19 18:00:07
hero_image: /img/react-native.jpg
hero_height: is-large
hero_darken: true
image: /img/react-native.jpg
tags: React JavaScript ReactNative
---

I decided to try out React Native to build a native app and see how it works. I'm an experienced web developer but have limited knowledge of apps. I helped build an app using Apache Cordova and PhoneGap many (many) years ago and also worked on another app using the ionic framework a few years later. If I'm honest I can't really remember how they worked as it was so long ago, so it was kind of like starting fresh for me.

## Development environment

The first thing I did was to get my development environment set up. I went over to the [React Native docs](https://reactnative.dev/docs/environment-setup) and was immediately faced with a decision. Should I use the React Native CLI or Expo Go? Instead of stopping and doing some research as to what this actually meant, I skim read each tab and saw that React Native CLI option requires Xcode to be installed, so I went straight to using Expo to save some time.

The setup seemed pretty easy and I created an ‘app' that would run in the browser. This felt very familiar to me as a web developer. I could make changes and the browser would auto refresh to display the changes.

## Styles

I then started looking through the [UI documentation](https://reactnative.dev/docs/style) and immediately disliked the way styles worked, by passing in a JavaScript object into a component. I think this is just personal preference though as I'm more old school and am used to defining CSS classes. I have to say, after a while of using it you get used to it. I think it needs some planning ahead to create some reusable styles as their own objects, otherwise you will be writing the same thing over and over again.

## Native Components

Next I looked at the React Native components. I was thinking it would be like ionic where the components are all pre-styled to look like a native app, but instead they have little to no styling at all. I can see the benefits of both approaches here as the already styled components allow you to build something quickly that looks like an app straight away, the downside is that it feels like a generic app and not something that has been designed for you. Once I got my head around the styling it made sense to me that the styles weren't included with React Native and you are able to customise it to your own needs.

## Navigation

One of the first things that I wanted to do was create a new screen and navigate to it from the first screen. I was a little surprised to find that you have to install another package for this. I kind of assumed there would be something basic built in that you could swap out with another library. Anyway, the [docs page](https://reactnative.dev/docs/navigation) gives you a couple of options, React Navigation (native) or React Native Navigation. I went with the React Navigation (native) library as the docs say it is a straight forward navigation solution.

You create a stack navigator and then add your screens to the stack. You can then use the navigation prop that you pass into screen to navigate to other screens. I managed to get it working fairly quickly and could now navigate between screens.

## TypeScript

It was at this point that I decided to add TypeScript to my project. There are some instructions about what to install with npm and what settings to add, then I could start converting the files from .js to .tsx.

The thing that took a lot of reading and re-reading for me was the [React Navigation typescript documentation](https://reactnavigation.org/docs/typescript). It took me a while to understand how to create the correct type for the screen components that have the navigation passed into them. I think my issue was that I tried to jump ahead instead of reading it bit by bit in the correct order. Standard developer impatience on my part I guess.

After a bit of fiddling I managed to get it all working and the TypeScript linter was now happy.

## Custom Components

After working on a couple of screens for the app I saw I was starting to repeat things. This is where I decided to treat this a bit like I would a standard React app and started building reusable components that I could just slot in to the screen where needed. This is the big strength of React. You can build new components that use existing components.

What I also noticed is that the root directory got quite cluttered with a lot of files. I have used Next.js for other projects and I liked the idea of having a Pages directory, so I moved all of the screen components into the Pages directory. Thinking about it now, maybe I should have called it Screens instead! I then moved all of the reusable components into a Components directory.

I'm not sure what the standard convention is for directory structure as I haven't stumbled upon the documentation page yet, but I was trying to do something logical for me.

## Running the app in the simulator

I decided to include a map on one of the screens but this is where things got a little difficult. There was an existing library ([reatct-native-maps](https://github.com/react-native-maps/react-native-maps)) that supported maps in iOS and Android, but it didn't support the browser. This is where I decided to go back to the React Native docs and read some more about the React Native CLI approach and installed Xcode so that I could run the app using the iOS simulator.

This took a while to download and install then set up, but the documentation is quite clear about the steps you need to do. I got it up and running in the simulator and the map now worked.

## Running on a real device

I then decided to try out the app on my iPhone instead of the simulator. I had to put the iPhone in developer mode first to allow the app to be installed and then followed the instructions to build using Xcode.

The build failed. This is where I got stuck for a bit. I have no experience of using Xcode and the error messages made little sense to me. I tried a few different things, like changing some settings, but it didn't make any difference. Then, I found a GitHub issue that seemed very similar to the issue I was having, where it said to open the .xcworkspace file instead of the .xcodeproj file. Like magic, the app now built and deployed to my phone.

The differences seem to be that the .xcworkspace includes the CocoaPods dependencies that were missing when running the .xcodeproj file. I'm sure there is more to it, but that's all I could tell from my limited experience.

## Conclusions

Overall, the developer experience of React Native seems very similar to using React for building your screens, but I think there will be an initial learning curve debugging issues with Xcode and native tools whilst you get used to them. Also, I haven't even thought about developing with Android yet so I'm sure that will come with its own set of challenges.

There are also a lot of new tools to learn and understand how they fit into the puzzle, such as Expo and Metro, which I still haven't really read up on, I just followed the instructions and it seems to work for me.

I think the main benefit of React Native is that it gives you a way into a new ecosystem without having to learn a new language or learn everything new straight away. It lets you see pretty instant results and lets you test on your phone by installing the Expo app and scanning a QR code.

Another thing I have to point out is that the documentation is very good for React Native components. You can tell a lot of effort has been put in to create well written documentation for each of the props and the methods. The components also have both TypeScript and JavaScript examples. Strangely the Guides section only seems to show JavaScript examples, unless I missed something?

<a href="https://stocksnap.io/photo/iphone-desk-ER4AMOC4LR">Photo</a> by <a href="https://stocksnap.io/author/lastly">Tyler Lastovich</a> on <a href="https://stocksnap.io">StockSnap</a>
