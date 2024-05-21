---
title: Customising Laravel Sail services using the Laravel Build server
description: Tips for customising the Laravel Sail services installed when using the Laravel Build server
layout: post
date: 2024-05-21 12:00:07
hero_image: /img/cranes.jpg
hero_height: is-large
hero_darken: true
image: /img/cranes.jpg
tags: Laravel Docker WebDev
---

Laravel offers a quick and easy command to create a new Laravel project that uses Laravel Sail using the Laravel build server. But what if you want to customise what services are installed by default?

## The default script

To create a default Laravel build using Docker with Laravel Sail on macOS you can run the following command:

```bash
curl -s “https://laravel.build/example-app” | bash
```

This will create a new Laravel app in the folder called ‘example-app’ with the following services installed by default:

- MySQL
- Redis
- Meilisearch
- Mailpit
- Selenium

Check out the [Laravel Documentation](https://laravel.com/docs/11.x#sail-on-macos) for more information and for how to get started with other operating systems.

## Why customise?

The default list of services is probably fine for most use cases, but for one project I was building an API without any web interface. I wanted to streamline the services to speed up the initial set up and remove the services I wasn't planning on using in the app.

In this case I didn't need Meilisearch, Mailpit or Selenium in my app. I didn't need Selenium as I had no interface to test with Laravel Dusk. It also didn't have a search or the need to send any emails.

## Removing services after the install

One way I found to manually remove the services, is to run the default script and then before you run sail up, then manually edit the docker-composer.yml file, removing the services you don't need. However, this means you have still downloaded docker images that you don't need, taking time and taking up storage space on your machine.

## Removing unneeded Sail services by editing the script

We can modify the default script by adding a with query parameter with a comma separated list of the services we need.

From our example above we only want MySQL and Redis to be setup so we can achieve this by using the following script.

```bash
curl -s “https://laravel.build/example-app?with=mysql,redis” | bash
```

Now when we open up our docker-compose.yml file we can see our PHP container (laravel.test), along with MySQL and Redis. The other services are no longer there as desired.

## Adding additional services at install time

We can also add additional services by adding them to the with query parameter comma separated list. For example, the below script will add Memcached to the default services installed.

```bash
curl -s “https://laravel.build/example-app?with=mysql,redis,meilisearch,mailpit,selenium,memcached” | bash
```

## Adding services after install

If you want to add an additional service after you have run the script, such as Mailpit to preview emails, then you can use the `sail:add` artisan command from your project root to add a service.

```bash
php artisan sail:add
```

This will provide a list of available services to choose from. Select from the list and it will add it for you.

## How it works

I took a look at the [Laravel sail server repo in GitHub](https://github.com/laravel/sail-server/blob/master/routes/web.php) to figure out how to customise the services installed. It allows you to set the 'with' and the 'php' query parameters to define the services and the php version required.

If you do provide a with query parameter then it will use that otherwise it defaults to `mysql,redis,meilisearch,mailpit,selenium`.

It also validates the list and ensures that the service you specify is within the list of available services. For example, if you try to add `nginx` to the list of services then it will return a validation error message.

```bash
curl -s "https://laravel.build/test-build?with=mysql,redis,nginx" | bash
bash: line 1: syntax error near unexpected token `('
bash: line 1: `Invalid service name. Please provide one or more of the supported services (mysql, pgsql, mariadb, redis, memcached, meilisearch, typesense, minio, mailpit, selenium, soketi) or "none".'
```

<a href="https://stocksnap.io/photo/cranes-construction-KOKXBB635S">Photo</a> by <a href="https://stocksnap.io/author/wyncliffe">Wyncliffe</a> on <a href="https://stocksnap.io">StockSnap</a>
