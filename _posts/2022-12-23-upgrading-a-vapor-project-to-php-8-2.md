---
title: Upgrading a Laravel Vapor app to PHP 8.2
description: How to upgrade a Laravel Vapor app to run on PHP 8.2
layout: post
date: 2022-12-23 17:00:07
hero_image: /img/laravel-valet-php-8-2.jpg
hero_height: is-large
hero_darken: false
image: /img/laravel-valet-php-8-2.jpg
tags: Laravel PHP Vapor
---

I recently updated a Laravel app running on Laravel Vapor to PHP 8.2. I was a bit nervous about the upgrade but it went smoothly for me. This article goes through the steps I went through to upgrade, from local development environment, dependencies, testing and deployment to vapor.

## Updating the local environment

First, things first, we need to update our local development environment to run PHP 8.2. I'm using a Mac so these steps may be different for other operating systems.

I use Homebrew to manage my PHP installation for me. This means I only need to run a couple of commands.

- Update Homebrew

```bash
brew update
```

- Update PHP

```bash
brew upgrade php
```

## Updating Laravel Sail

My Laravel app uses Laravel Sail and docker to run locally. By default it runs on PHP 8.1, but we want to update the configuration to use PHP 8.2. These steps following the official documentation on the Laravel docs site for setting the PHP version for Laravel Sail.

First, need to make some changes to the `docker-compose.yml` file in our app:

- Update the context to use 8.2

```yml
context: ./vendor/laravel/sail/runtimes/8.2
```

- Update the image name to 8.2

```yml
image: sail-8.2/app
```

We then need to rebuild our PHP container using the updated config, then bring it up.

```bash
sail build --no-cache
sail up
```

I normally use `sail up -d` so it starts in detatched mode.

## Updating Laravel Valet

If you use [Laravel Valet](https://laravel.com/docs/9.x/valet#php-versions), then assuming you have updated your local version of PHP to 8.2 as above, you can run the following command.

```bash
valet use php@8.2
```

If you get the below error message:

> Valet doesn't support PHP version: php@8.2 (try something like 'php@7.3' instead)

Then try running the following:

```bash
composer global update
valet use php@8.2
```

If you still get the same error message (as I did), it may be because you are using v2 of valet instead of v3. Reinstalling valet seemed to fix the issue for me and updated from v2 to v3.

```bash
composer global require laravel/valet
valet use php@8.2
valet install
```

## A note about Laravel Homestead

I don't use Homestead myself, but reading through the [documentation](https://laravel.com/docs/9.x/homestead#php-versions) it appears that PHP 8.2 is not yet supported on Homestead at the time of writing.

## Updating the Laravel app

Now we can update our Laravel app. We need to update our `composer.json` to require PHP greater than 8.2 and Laravel greater than 9.43. If you use other Laravel packages, such as Sanctum, then these may also need to be updated too.

```json
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^9.43"
    // other dependencies
  }
}
```

We can now update our dependencies using composer.

```bash
composer update
```

This may flag up some conflicts with packages that are not compatible with PHP 8.2. In my case I had to update `spatie/simple-excel` to `^3.0` where support for PHP 8.2 was added. I then needed to run the update command again to see if it would now update as expected.

This resolved the issue for me, but each Laravel app is different with many different dependencies. If you are using a package that doesn't yet support 8.2 then check out the issues and pull requests on the GitHub repo and see if someone has already requested this. If not, consider creating an issue, or even create a pull request with the needed changes and help the developer out.

## Testing

Our development environment is all set up and our dependencies have all been updated. Now we need to test our Laravel app.

To see if there are any deprecation warnings that you need to take care of, you can update your `config/logging.php` channels, adding a deprecations channel as per the [Laravel documentation](https://laravel.com/docs/9.x/logging#logging-deprecation-warnings).

```php
'channels' => [
    'deprecations' => [
        'driver' => 'single',
        'path' => storage_path('logs/php-deprecation-warnings.log'),
    ],
],
```

You can then manually test your Laravel app and check if anything is flagged in the `php-deprecation-warnings.log` file.

As well as deprecations, PHP 8.2 also has some breaking changes that may impact you. Take a read through [What's new in PHP 8.2](https://stitcher.io/blog/new-in-php-82) to find out more about the changes.

Hopefully you will also have a test suite for you app with good code coverage. This will allow you to run your automated tests and check that everything is still working as expected and see if anything is flagged in your log files.

## Updating Vapor

Once we have sorted any potential upgrade issues locally, we should now be ready to update the `vapor.yml` configuration to use PHP 8.2.

Following the [Laravel Loves PHP 8.2](https://blog.laravel.com/laravel-loves-php-82) blog post, you just need to update your vapor.yml file so the runtime is `php-8.2:al2`.

```yml
environments:
  staging:
    memory: 1024
    cli-memory: 512
    runtime: "php-8.2:al2"
```

You should then be able to test out all your changes on your staging environment by redeploying to vapor (assuming your staging environment is called staging).

```bash
vapor deploy staging
```

<a href="https://stocksnap.io/photo/abstract-background-VCJK4NBK4W">Photo</a> by <a href="https://stocksnap.io/author/jeswin">Jeswin</a> on <a href="https://stocksnap.io">StockSnap</a>
