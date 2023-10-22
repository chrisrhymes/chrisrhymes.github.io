---
title: Optimizing Laravel Eloquent queries
description: A few tips and tricks for optimizing Laravel queries
layout: post
date: 2023-10-22 17:00:07
hero_image: /img/optimising-laravel-queries.jpg
hero_height: is-large
hero_darken: true
image: /img/optimising-laravel-queries.jpg
tags: Laravel Eloquent Database
---

Here are a few tips and tricks that I have learnt along the way to help optimize your database queries in Laravel. Sometimes, little changes can add up and make a big difference overall.

## Select only the fields you need

Adding a `select()` to your query means that you only retrieve the fields that you are going to use, rather than returning every field in your model. If your view doesn’t need the field then save some memory by only fetching and returning the fields you need.

Rather than:

```php
$users = User::get();
```

You can select only the fields you want, such as id, name and email:

```php
$users = User::query()
    ->select('id', 'name', 'email')
    ->get();
```

[Specifying a select statement](https://laravel.com/docs/10.x/queries#specifying-a-select-clause)

## Pluck the field you need

If you only need one field from the models then you can use `pluck()` to just return that one field. This returns an array instead of a collection of models.

```php
$userNames = User::query()->pluck('name');
```

If you want a specific key for your array, such as the user’s id, then you can set that field name as the second parameter.

```php
$userNames = User::query()->pluck('name', 'id');
```

[Retrieving a list of column values](https://laravel.com/docs/10.x/queries#retrieving-a-list-of-column-values)

## Selecting specific fields in relations

When fetching relations you can specify which fields you want to return in the relation. Here we specify that we only want the role id and name returned for the related roles models.

```php
User::query()->with('roles:id,name')->get();
```

[Eager loading specific columns](https://laravel.com/docs/10.x/eloquent-relationships#eager-loading-specific-columns)

## Only getting the latest related record

Let's say you have an audit table that records each time a user logs in. To get the latest audit you may try and use an existing relationship, such as User has many audits, then filtering them to get the latest item. Instead of doing this, Laravel haas a Has One Of Many relationship that you can use to always return the latest or oldest.

```php
public function latestAudit()
{
    return $this->hasOne(Audit::class)->latestOfMany();
}
```

Then you can use it as follows:

```php
$user = User::query()
    ->with('latestAudit')
    ->first();
$user->latestAudit; // A single Audit model.
```

[Has one of many](https://laravel.com/docs/10.x/eloquent-relationships#has-one-of-many)

## Creating indexes

Consider adding indexes to columns that are frequently searched. One example could be searching for existing users in our Laravel app by their name so we can tag them in a comment.

Here we can create an index on the name column in our users table when it is defined in the migration:

```php
$table->string('name')->index();
```

If we are adding an index to an existing column then you can do it as follows:

```php
$table->index('name');
```

Another similar example is if you have two fields that are frequently used together. Instead of name, we could have first_name and last_name in our users table. To add a compound index we can do the following in our migration:

```php
$table->index(['first_name', 'last_name']);
```

Then when we use a where with both fields it should use this compound index:

```php
$users = User::query()
    ->where('first_name', 'like', "{$search}%")
    ->orWhere('last_name', 'like', "{$search}%")
    ->get();
```

[Creating indexes](https://laravel.com/docs/10.x/migrations#creating-indexes)

## Where like searches and indexes

It's tempting to write where statements that search for any rows that contain a string. For example, get any users where their name contains a provided search term, using the `%` as a wildcard in the search:

```php
$users = User::query()
    ->where('name', 'like', "%{$search}%")
    ->get();
```

This means that although the index for name exists, the database can't use it.

If you only need to search strings beginning with the search term, instead of containing the search term, then the database should be able to use your index and return the results faster.

```php
$users = User::query()
    ->where('name', 'like', "{$search}%")
    ->get();
```

## Full text index

If you have a large field of text, something like a biography field on your user, then you could try adding a full text index to the field in a database migration. Just a note though, this is not supported in SQLite.

```php
$table->fullText('biography');
```

Once you have the full text index you can then use `whereFullText()` instead of a where like query.

```php
$users = User::query()
    ->whereFullText('biography', 'developer')
    ->get();
```

[Full text where clauses](https://laravel.com/docs/10.x/queries#full-text-where-clauses)

## Pagination

One thing to consider with most of the previous examples is that we are getting all of the results by using `get()`.

This may be fine when there are a few rows in your database, but when you have hundreds or thousands of rows then it will become slow trying to fetch all the rows from the table.

Normally you will only want to return a set of results at a time. You can do this using `skip()` and `take()` to limit the results like follows:

```php
$users = User::query()
    ->skip(10)
    ->take(10)
    ->get();
```

But this can become cumbersome quite quickly, having to keep track of how many to skip.

Instead, you can use `paginate()` to return a set of results. Laravel automatically detects the page number from the query string so it knows what set of results to display at a time. We can pass in an integer into the `pagintate()` method to define how many to return, for example this will return 10 results per page.

```php
$users = User::query()
    ->paginate(10);
```

[Database Pagination](https://laravel.com/docs/10.x/pagination#main-content)

<a href="https://stocksnap.io/photo/black-alarmclock-TZHYCANBO9">Photo</a> by <a href="https://stocksnap.io/author/jeshootscom">JESHOOTS.com</a> on <a href="https://stocksnap.io">StockSnap</a>
