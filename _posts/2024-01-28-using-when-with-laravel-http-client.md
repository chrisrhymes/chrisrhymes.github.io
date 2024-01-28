---
title: Using when with the Laravel Http Client
description: Tips for using when() with the Laravel Http Client
layout: post
date: 2024-01-28 18:00:07
hero_image: /img/laravel-http-when.jpg
hero_height: is-large
hero_darken: true
image: /img/laravel-http-when.jpg
tags: Laravel Http WebDev
---

Here's a little tip I discovered that I haven't seen documented anywhere. You can use when() and unless() with the Laravel Http client.

Here is an example method that uses the Laravel Http client.

```php
use Illuminate\Support\Facades\Http;

public function getUser(int $id): array
{
    $response = Http::baseUrl('https://example.com/api')
        ->get("user/{$id}")
        ->throw()
        ->json();

    return $response;
}
```

Now imagine that we wanted to pass a token in that is sent as a header.

```php
use Illuminate\Support\Facades\Http;

public function getUser(int $id, string $token): array
{
    $response = Http::baseUrl('https://example.com/api')
        ->withHeader('X-Token', $token)
        ->get("user/{$id}")
        ->throw()
        ->json();

    return $response;
}
```

The Http client makes this very easy by using the `->withHeader()` method.

But what happens if the token is optional for some calls? Some requests need it and others don't?

Well, we could copy the whole method and duplicate all our code, or we could make use of `->when()`.

If you look into the PendingRequest class, you’ll see that it makes use of the `Illuminate\Support\Traits\Conditionable` trait. This trait gives it access to both when() and unless().

Here we set the token to be an optional parameter. When it is passed in, the when() resolves as true and then adds the closure.

```php
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\PendingRequest;

public function getUser(int $id, ?string $token = null): array
{
    $response = Http::baseUrl('https://example.com/api')
        ->when($token, function (PendingRequest $request) {
            $request->withHeader('X-Token', $token);
        })
        ->get("user/{$id}")
        ->throw()
        ->json();

    return $response;
}
```

You can also set a default method if you need to which runs when the when() resolves to false. An example could be setting a default token in the header if one is not provided.

```php
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\PendingRequest;

public function getUser(int $id, ?string $token = null): array
{
    $response = Http::baseUrl('https://example.com/api')
        ->when($token, function (PendingRequest $request) {
            $request->withHeader('X-Token', $token);
        }, function (PendingRequest $request) {
            $request->withHeader('X-Token', 'default-value');
        })
        ->get("user/{$id}")
        ->throw()
        ->json();

    return $response;
}
```

<a href="https://stocksnap.io/photo/city-skyline-0SE0ZRMZCM">Photo</a> by <a href="https://stocksnap.io/author/focastock">FOCA Stock</a> on <a href="https://stocksnap.io">StockSnap</a>
