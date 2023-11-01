---
title: Querying Laravel Eloquent's Many to Many relationships
description: Different methods for querying Laravel Eloquent's Many to Many relationships
layout: post
date: 2023-11-01 18:00:07
hero_image: /img/many-to-many-relationships.jpg
hero_height: is-large
hero_darken: true
image: /img/many-to-many-relationships.jpg
tags: Laravel Eloquent Database
series: laravel_many_to_many_series
---

A while ago I wrote about how to use a many to many relationship in Laravel, (all the way back in April 2019). Now I want to build on this example and show how you can query many to many relationships, but also how you can add additional constraints to the query to further filter your results.

## Retrieving Breads that have Sandwich Fillers

In the [previous article]({% post_url 2019-04-06-laravel-many-to-many-relationships %}), we had breads and sandwich fillers, both with many to many relationships. A bread type belongs to many fillings and a sandwich filler belongs to many bread types. Hopefully it won't make you too hungry whilst reading this.

What if we wanted to find the bread types that have fillings?

For this we can use `has()` and pass in the relationship name that is defined in our Bread model. In this case it's 'sandwichFillers':

```php
$breads = Bread::has('sandwichFillers')->get();
```

This will return any breads that have at least one sandwich fillers.

## Retrieving Breads with 2 Sandwich Fillers

Building on the previous example, if we want to retrieve breads with two sandwich fillers, then we can pass in additional parameters to the `has()`. After the relationship name, we pass in the operator and then the count.

```php
$breads = Bread::has('sandwichFillers', '=', 2)->get();
```

This will then return us the breads that have exactly two sandwich fillers.

If we wanted to return the breads with at least 2 sandwich fillers then we update the operator from equal to, to greater than or equal to.

```php
$breads = Bread::has('sandwichFillers', '>=', 2)->get();
```

## Retrieving breads with a specific sandwich filler

If we want to search for bread with a particular sandwich filler then we can use `whereHas()`, instead of `has()`, and pass in the relationship name and then a function for the query.

By the way, the `query()` in the below examples isn't essential, it just makes them easier to read on smaller screens.

```php
use Illuminate\Database\Eloquent\Builder;

$breadsWithCheese = Bread::query()
    ->whereHas('sandwichFillers', function (Builder $query) {
        $query->where('name', '=', 'cheese');
    })
    ->get();
```

## Retrieving breads with multiple sandwich fillers

If we want to search for breads with multiple sandwich fillers then we can use the above whereHas, but change the query to use orWhere in the query filter.

```php
use Illuminate\Database\Eloquent\Builder;

$breadsWithFillings = Bread::query()
    ->whereHas('sandwichFillers', function (Builder $query) {
        $query->where('name', '=', 'cheese')
            ->orWhere('name', '=', 'ham');
    })
    ->get();
```

We could also simplify this a bit further by using whereIn, passing in the field name and then an array of values, such as cheese and ham.

```php
use Illuminate\Database\Eloquent\Builder;

$breadsWithFillings = Bread::query()
    ->whereHas('sandwichFillers', function (Builder $query) {
        $query->whereIn('name', ['cheese', 'ham']);
    })
    ->get();
```

When we get the results back, this may not be exactly what you expected. You may think the whereIn would return breads with both cheese AND ham, but it actually returns breads with cheese OR ham sandwich fillers.

If we look back to the first query with the orWhere then this gives us a clue as to what the whereIn is doing. According to [w3schools](https://www.w3schools.com/mysql/mysql_in.asp) for the MYSQL IN operator:

> "The IN operator is a shorthand for multiple OR conditions."

To explain a bit more, this will return breads with cheese, breads with ham, and breads with ham and cheese.

So how can we query for only breads with cheese AND ham?

## Retrieving breads with only specific sandwich fillers

The `whereHas()` allows us to provide additional constraints after the function. This is very similar to how the `has()` allows you to provide an operator and a count. After the relationship name and function we can pass in the operator and the count.

```php
use Illuminate\Database\Eloquent\Builder;

$breadsWithOnlyCheeseAndHam = Bread::query()
    ->whereHas('sandwichFillers', function (Builder $query) {
        $query->whereIn('name', ['cheese', 'ham']);
    }, '>', 2)
    ->get();
```

This will now return breads with only cheese and ham sandwich fillers.

If we wanted to cast the net a bit wider and have sandwiches with cheese, ham and pickle then we can update the operator to be greater than or equal to so it includes breads with cheese AND ham but may also have other sandwich fillers too, such as pickle.

```php
use Illuminate\Database\Eloquent\Builder;

$breadsWithCheeseAndHam = Bread::query()
    ->whereHas('sandwichFillers', function (Builder $query) {
        $query->whereIn('name', ['cheese', 'ham']);
    }, '>=', 2)
    ->get();
```

Hopefully this will give you a better understanding of what is possible when querying many to many relationships and how you can better filter them to fit your needs.
