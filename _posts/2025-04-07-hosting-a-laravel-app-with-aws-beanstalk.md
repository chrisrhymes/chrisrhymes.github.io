---
title: Hosting a Laravel app with AWS Beanstalk
description: Some notes about hosting a Laravel app with AWS Beanstalk
layout: post
hero_image: /img/hosting-laravel-app-with-beanstalk.jpg
hero_height: is-large
hero_darken: true
image: /img/hosting-laravel-app-with-beanstalk.jpg
tags: webdev laravel hosting
---

There are lots of possible hosting solutions available for Laravel, from Forge, to Vapor to the new Laravel Cloud. I'll start out by saying that these other solutions are much easier to get up and running than beanstalk, but I thought I'd share some of the "fun" I had getting it up and running.

If you have to use AWS for hosting, and for whatever reason, you can't make use of Forge or Vapor, then one potential elastic, scalable solution is AWS Beanstalk.

[AWS Beanstalk](https://aws.amazon.com/elasticbeanstalk/) essentially provides you with a number of EC2 (Elastic Cloud Computing) servers that sit behind a load balancer. If demand increases then more instances can be created. If demand drops then the number of instances drops down to save you costs.

## Getting started

Let's assume you have an existing Laravel app you want to deploy, but if you don't then you can create a new Laravel app following the [Laravel documentation](https://laravel.com/docs/12.x/installation) and follow along. We also assume you already have an AWS account up and running.

First you need to install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). The installation method varies per operating system, so follow their guidelines. Once this is installed, I'd recommend setting up the AWS Single Sign On (AWS SSO) and create a profile for your account. For the purposes of this guide, let's assume your profile is called `dev-account` going forward.

Next we need to install the [Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html). Why this isn't included as part of the AWS CLI I don't know? Anyway, follow the instructions to install and set up the AWS EB CLI.

## Beanstalk Application

Right, next we want to create an application in Beanstalk. The application is like a project, and each application can have multiple environments, such as production and staging.

Start by changing directory into your project root, then running the eb init command with the project name and the AWS profile you defined earlier. In this example the application will be called my-laravel-app.

```bash
eb init my-laravel-app —profile dev-account
```

This will ask you some questions about your application. When I ran this it saw the package.json file and assumed it was a node.js project. Ensure you say no it isn't a node project then choose PHP from the list, selecting PHP 8.4 (or the version you wish to use) for your site.

Ensure you allow SSH from your machine to the EC2 instances and specify a name for the ssh key to use. This will create the key in your .ssh directory.

When the setup has finished it will should have created a `.elasticbeanstalk/config.yml` file with your settings in your project root. This file is added to your .gitignore file so it won't be committed to your version control.

## Beanstalk Environment Preparation

You can proceed to create an environment and deploy your project, but it may not work without some additional configuration. Here is what I added to get my Laravel app to work with AWS Beanstalk.

### Adding PHP Extensions

I quickly found out that the AWS Linux OS for PHP 8.4 doesn't have php-zip which I needed for my project. If you need this PHP extension you can create the following file in `.platform/hooks/prebuild/install-php-zip.sh` with the following content:

```bash
#!/usr/bin/env bash

yum -y install libzip libzip-devel

# Will enable zip extension in /etc/php.ini

pecl upgrade zip
```

Putting the script in the `prebuild` folder tells Beanstalk that you need to run this script before the Laravel app is deployed to the EC2 instance and therefore before the composer install is run.

More information on platform hooks is available in the [AWS beanstalk documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html).

If there are any additional PHP dependencies you need then you can either add them to this file or created separate script files within the `prebuild` folder.

### PHP Configuration

The next file that we need to add before we can create your environment configures some PHP settings and installs some packages. The default setting for Beanstalk EC2 instances is to use the project root as the document root, but we need to set it to the public folder.

Create a file called `.ebextensions/composer.config` and paste in the following.

```yaml
packages:
  yum:
    nfs-utils: []
    jq: []
    amazon-efs-utils: []
    node: []
    npm: []

option_settings:
  aws:elasticbeanstalk:container:php:phpini:
    document_root: /public
    display_errors: "Off"
    composer_options: --optimize-autoloader
```

This file will install some dependencies for us to use later through the packages list. The amazon-efs-utils is useful if you want to use AWS Elastic File Store (EFS) to store any files. The node and npm dependencies allows you to build your frontend assets.

The option settings then let us override the default settings. I like to add the optimise autoloader setting when doing composer install on a server.

### Frontend configuration

The last file we need to add will take care of our frontend npm dependencies. We have configured Elastic Beanstalk to use a PHP instance, so it will automatically run composer install for us and install our PHP dependencies, but it doesn't install and build our frontend dependencies. We have to do this ourselves.

To tell Beanstalk to install and compile our frontend assets we can create a `.platform/hooks/postdeploy/npm-dependencies.sh` file with the following config.

```bash
#!/usr/bin/env bash

cd /var/www/html

npm install

npm run production
```

The `postdeploy` folder tells Beanstalk to run this after our code has been deployed to the EC2 instance(s). Add and commit your new files to your git repo.

## Creating the environment

Ok, we are now ready to create an environment. Let's start with the staging environment, along with a database for our environment.

```bash
eb create staging --database --profile dev-account
```

This command will prompt you for the database type, the username and password. Make sure you write them down somewhere.

A quick note about the database. If you create a database as part of your environment, then if you delete the environment it will delete your database too. You can change the settings to decouple the database, or you can create a separate database and manually link it to your environment.

The environment will take a little while to provision all the resources it needs to get up and running (especially the database). Once it has finished you can then add the environment variables your Laravel app needs. Rather than creating a .env file on the server, you create the variables through the command line or the AWS web console.

The main variables you will need to add are:

- APP_KEY
- APP_ENV
- APP_DEBUG
- DB_CONNECTION
- DB_DATABASE
- DB_HOST
- DB_PASSWORD
- DB_USERNAME

The AWS tutorial for Laravel and Elastic Beanstalk suggests that you update your `config/database.php` file to match their predefined database variables, such as RDS_HOSTNAME, as these are automatically injected into your environment, but it's up to you how you want to proceed.

Once you add and save these variables it will redeploy your environment and your app should now be available to view.

Sometimes it seems that it doesn't always run the post build scripts when you edit environment variables. This is very annoying as it means that your frontend assets don't exist. Sometimes it seems fine, but other times it causes errors. You can manually redeploy the environment using the below:

```bash
eb deploy staging —profile dev-account
```

## Running artisan scripts

To run artisan scripts, you can ssh into the EC2 instance using the below:

```bash
eb ssh staging —profile dev-account
```

I have found a couple of issues when running artisan scripts with Elastic Beanstalk.

- The environment variables don't exist to the ec2-user
- The ec2-user doesn't have permission to write to the log file

I discovered the first issue when I tried to migrate the database. It stated that the sqlite database doesn't exist and would I like to create it. I was confused as I had set the environment variables to use mysql and not sqlite.

After a bit of experimenting I discovered you could set the environment variables to your session by running the below command:

```bash
export $( /opt/elasticbeanstalk/bin/get-config --output YAML environment | sed 's/: /=/g' | xargs)
```

This gets the config variables in yaml format, then replaces the `:` with `=` to make it the expected format and then exports them to your session. I'll be honest, it's very annoying having to do this.

For the second issue of the ec2-user not being able to write to the log file, I have found you can su to the webapp user and then run artisan commands using that user.

**An important disclaimer here! I'm not sure this is the best way of doing things so maybe spend some time to find a better solution to these issues.**

## Storage

We briefly mentioned storage earlier. The EC2 instances are designed to be throw away instances that can be easily replaced as well as being load balanced. This means we can't store any content that isn't in your version control as they won't exist in new instances that are created.

There are a few possible solutions depending on your circumstances, but to summarise some of the options I've investigated, you can either use AWS Elastic File System (EFS) and create a mount point on each instance or you can create an S3 bucket and set your filesystem disk to use S3 and add the relevant environment variables needed for S3.

There is some information on using EFS with Elastic Beanstalk on the [AWS documentation site](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/services-efs.html).

A little reminder, as per the database, if you create an EFS as part of your Beanstalk environment, then if you delete the environment it will also delete the EFS and all the content within it.

## Configuring HTTPS

The default configuration sets up the environment to be accessible on port 80, so to allow https you need to update the load balancer configuration and add a listener for port 443. How you do this depends on the type of load balancer you are using and whether you want to terminate HTTPS at the load balancer of the EC2 instances, so consult the [Elastic Beanstalk documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/configuring-https.html) for how to get this up and running.

## Scalability

One of the main benefits of Elastic Beanstalk is the elastic nature of the system. You can either create a configuration file to specify the minimum and maximum number of instances or you can do this through the web console. You may want to do this through the web console so you can specify different values for production and staging environments. You pay for what you use, so you probably don't really want more than you need on your staging environment.

In the web console, go to your environment and then the configuration section. From here, edit the capacity configuration and set the minimum and maximum instances for your environment and then click the Apply button.

It will redeploy your environment and create any additional instances you have specified to meet the new minimum. When you get more traffic it will increase the number of EC2 instances up to the maximum you have set.

## Conclusion

Hopefully you will now have your staging environment all up and running with AWS Elastic Beanstalk. As you can see by the length of this guide, there is quite a lot of configuration to get things up and running, as well as various annoyances along the way.

I normally use [Laravel Vapor](https://vapor.laravel.com) to host my projects and you can tell it was built to work for Laravel and make the developer experience silky smooth. I am interested to try out [Laravel Cloud](https://cloud.laravel.com/) at some point in the future too as that is all about shipping your app.

<a href="https://stocksnap.io/photo/macbook-computer-JPZDGEMDH3">Photo</a> by <a href="https://stocksnap.io/author/burstshopify">Burst</a> on <a href="https://stocksnap.io">StockSnap</a>
