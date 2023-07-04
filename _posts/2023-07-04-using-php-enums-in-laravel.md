---
title: Using PHP Enums in Laravel to store additional information
description: How to use PHP Enums in Laravel to store additional information
layout: post
date: 2023-07-04 17:00:07
hero_image: /img/using-enums-in-laravel.jpg
hero_height: is-large
hero_darken: false
image: /img/using-enums-in-laravel.jpg
tags: Laravel PHP Enums
---

Sometimes it's difficult to decide where to put code, trying to figure out where it really belongs. Laravel has a predefined folder structure that you can keep to for most scenarios, but I wasn't sure whether the settings should be kept in a config file, a class, or somewhere else. In the end I decided to use an enum.

I had been reading an article about enums on [stitcher.io](https://stitcher.io/blog/php-enums) and thought this would be a good way of limiting the available options that users could select as their social network in their profile page, but also a good way of storing more related information.

## Creating an enum

I created a simple enum to store the options, but made it a backed enum so it had a string value which I could store in the database.

```php
<?php

namespace App\Enums;

enum SocialNetwork: string
{
   case FACEBOOK = 'facebook';
   case TWITTER = 'twitter';
   case YOUTUBE = 'youtube';
}
```

## Enum Casting in the Model

Laravel also has a useful feature that lets you cast the value as an enum in the relevant model.

```php
<?php

namespace App\Models;

use App\Enums\SocialNetwork;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialProfile extends Model
{
    use HasFactory;

    protected $casts = [
        'social_network' => SocialNetwork::class,
    ];
}
```

This means you can interact with the enum instance instead of just the string value out of the database and have access to the enums methods too. We will come back to this a bit later.

## Validating an Enum

Next I wanted to check that the option selected was a valid enum option. Again, Laravel makes this super easy using the Enum validation rule. This checks that the value of the `social_network` in the request is a valid value of the enum.

```php
use App\Enums\SocialNetwork;
use Illuminate\Validation\Rules\Enum;

$request->validate([
    'social_network' => [new Enum(SocialNetwork::class)],
]);
```

## Storing additional information against an Enum

As well as just defining options, enums also allow additional methods. You can even use the enum within the method too.

I wanted a way of storing the valid domains for each of the enum options, so I created a match statement that used the enum value and returned an array of valid domains.

```php
<?php

namespace App\Enums;

enum SocialNetwork: string
{
   case FACEBOOK = 'facebook';
   case TWITTER = 'twitter';
   case YOUTUBE = 'youtube';

   public function domains(): array
   {
        return match ($this) {
            SocialNetwork::FACEBOOK => [
                'facebook.com',
                'fb.me',
                'fb.com',
            ],
            SocialNetwork::TWITTER => [
                'twitter.com',
                't.co',
            ],
            SocialNetwork::YOUTUBE => [
                'youtube.com',
                'youtu.be',
            ],
        };
   }
}
```

Another useful thing about this is if I needed to add a new social network in future I have only one place to add the definition and the domains. I can easily add Instagram as an option in the enum and everywhere I use the enum the code should be updated.

## Using an enum in a custom validation rule

I wanted to ensure that the url someone entered into a form was a domain from one of my predefined social networks. Rather than writing a list of domains again in this rule, we can use the `SocialNetwork::cases()` method to list out the valid cases. We can then use `array_map()` to pull out all of the valid domains for each case.

The domains are a nested array, so I made use of the flatten collection method to create a single level array.

Finally we can check if the url (the value passed into the rule) matches one of the allowed domains. If it doesn't then it triggers the validation failure.

```php
<?php

namespace App\Rules;

use App\Enums\SocialNetwork;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;

class SocialNetworkRule implements ValidationRule
{
    /**
     * Get the allowed domains from the SocialNetwork enum
     * and ensure at least one matches the value.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $allowedDomains = array_map(
            fn (SocialNetwork $socialNetwork) => $socialNetwork->domains(),
            SocialNetwork::cases()
        );

        $domains = collect($allowedDomains)
            ->flatten()
            ->all();

        if (! Str::contains($value, $domains)) {
            $fail('The :attribute field must be a valid social network.');
        }
    }
}
```

## Getting the social network from a url

In another place in my Laravel app I wanted to get the social network from a link. This method loops through the cases and checks if the link is within the array of domains. If it is, then return the value of the enum. If it doesn't match then it returns null.

```php
use Illuminate\Support\Str;

public function getNetwork(string $link): string|null
{
    foreach (SocialNetwork::cases() as $case) {
        if (Str::contains($link, $case->domains())) {
            return $case->value;
        }
    }

    return null;
}
```

I hope this has given you some inspiration for how you could use enums in future Laravel projects.

<a href="https://stocksnap.io/photo/fireworks-celebration-11MG2E0JN1">Photo</a> by <a href="https://stocksnap.io/author/tgray">Tricia Gray</a> on <a href="https://stocksnap.io">StockSnap</a>
