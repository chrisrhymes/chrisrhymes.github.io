---
title: Hosting a Next.js site with AWS Elastic Beanstalk
description: How to host a Next.js site with AWS Elastic Beanstalk
layout: post
hero_image: /img/next-js-beanstalk.jpg
hero_height: is-large
hero_darken: true
image: /img/next-js-beanstalk.jpg
tags: webdev hosting javascript
---

I thought I'd share some learnings about how to host a Next.js site with AWS Elastic Beanstalk. This is a minimum configuration to get a basic site up and running.

## Getting started

In this example, we are going to create a new Next.js project, but the process should apply to existing projects too.

The following command creates a folder called 'my-app' and creates a new Next.js app

```bash
npx create-next-app@latest my-app --yes
cd my-app
```

We need to create a few files so that the Next.js app is built on the server before it is deployed, then we need to tell AWS Elastic Beanstalk how to start the Next.js project. There is also a little configuration that will help our site deploy. 

## Hooks
When you set the platform to node.js, Elastic Beanstalk should automatically run `npm install` to install your dependencies, but it doesn't automatically run the `next build` that is needed for a production site.

There are a couple of ways that you can get around this. One way is to build your app locally and zip it up, then deploy that build, or you can add some hook scripts to run the build on the server. We are going to run the build on the server, as this allows us to set environment variables in Elastic Beanstalk and use them when the site is built.

Beanstalk offers both deployment hooks and configuration hooks. 

Deployment hooks are run when you push up code changes and configuration hooks run when you update configuration or environment variables through the web console or CLI. 

When you update an environment variable, you need to re-run `next build` to build the code with the latest environment variables.

Make a .platform directory in your project root, then `hooks` and `confighooks` directories, then create a `predeploy` directory within each.

- .platform/
    - hooks/
        - predeploy/
    - confighooks/
        - predeploy/

We can create a `01_build.sh` script file in both the `.platform/hooks/predeploy` and `.platform/confighooks/predeploy` directories to run the build when either the code is pushed or the config is changed.

```bash
#!/bin/bash

set -e

cd /var/app/staging
npm install
npm run build
``` 

We need to use the `predeploy` hook as this runs after the code has been checked out, but before the code is deployed. 

- Beanstalk creates a `/var/app/staging` directory to do the build work, 
- It then deletes the `/var/app/current` directory, 
- It then renames the `/var/app/staging` directory to `/var/app/current` for your live app
- Then it starts up the service

More information about [platform hooks](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.hooks.html).

## Procfile

Beanstalk has a default run command of `npm start` but we want to specify the port number so nginx is listening on the correct port. We can customise the start command using a Procfile in the project root.

```
web: node_modules/.bin/next start -p $PORT
```

More information on the [Procfile](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-configuration-procfile.html).

## Setting the server type

By default, Beanstalk uses `t3.micro` EC2 servers. From my initial testing, the build time took too long and actually timed out the deployment.

We can define the servers we want to use in our build with a config file. Create an `.ebextensions` directory in your project root, then create a file called `next.config`. The name doesn’t really matter but it's handy to know these are settings that are useful for Next.js setup.

Paste the below into the next.config file and save it. This will: 

- Use the t4g.medium server as a minimum which has 4GB of RAM and 2 vCPUs. Feel free to try lower spec servers and see if it works for you.
- Set nginx to listen on port 3000
- Set the environment to launch a single instance. This will save on costs for this example, but for a production site you probably want a load balanced environment and multiple servers running.

```yaml
option_settings:

  # Min 4GB RAM per instance for Next
  # The next build times out with micro servers
  aws:ec2:instances:
    InstanceTypes: t4g.medium, t4g.large
    
  # Configure the port the proxy server (nginx) listens on
  # https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-platform-proxy.html
  aws:elasticbeanstalk:application:environment:
    PORT: 3000
    
  # Launch a single EC2 instance without a load balancer
  aws:elasticbeanstalk:environment:
    EnvironmentType: SingleInstance
```

## Creating a beanstalk application

Now we have our files in place we can create an application using the Elastic Beanstalk CLI. You need the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and the [Elastic Beanstalk CLI](https://github.com/aws/aws-elastic-beanstalk-cli), as well as [configuring single sign on](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html) for the AWS CLI. 

In the below examples we are using `my-aws-profile` as the AWS Single Sign On profile for our AWS account.

The application is the container that can have many environments, such as production, staging, etc.

Let's create a Beanstalk app called `example-next`

```bash
eb init example-next --profile my-aws-profile 
```

This should automatically recognise that you are using node.js from your project files. Select the version of node you would like to use and follow the instructions to either create a new key pair or use an existing key pair for SSH access.

The process takes a few minutes to run to generate the application.

## Creating a beanstalk environment

Once we have an application, we can then create an environment and deploy our app. The Elastic Beanstalk CLI will zip up your project and upload it to an AWS S3 bucket. As Elastic Beanstalk automatically runs `npm install` we can remove the `node_modules` directory from our project before running the create or deploy commands to make the upload smaller. 

```bash
eb create staging --profile my-aws-profile
```

This will zip up your code and upload it to the S3 bucket that was created when we initialised the environment. It will then create the resources it needs, along with an EC2 server.

When the EC2 server is ready, it will then copy the code into the `staging` directory, run `npm install`, then the predeploy hook and then move it to the current folder and run the command in our Procfile. It may take a bit longer the first time this is run as it has to create the environment and the EC2 server first. It should be quicker when deploying updates. 

## Opening the environment

To see our running Next.js app, run the below and it should launch a new browser window for you.

```bash
eb open staging --profile my-aws-profile
```

## Deploying updates

Let's say we change our app code and want to deploy the latest version to our existing staging environment. This can be done with the following command. You use `eb deploy` rather than `eb create` as the environment already exists. The `staging` in the below command is the name of the environment you want to update. 

```bash
eb deploy staging --profile my-aws-profile
```

This command will take a few minutes to run as it will build your Next.js app on the EC2 server before deploying the build and starting the server. 

## Adding environment variables

You can add environment variables using the web console or the CLI. When you update the environment variables it should run the `confighooks` we set earlier. This means it will rebuild your app using the latest environment variables, deploy it and then start it up. 

<a href="https://stocksnap.io/photo/developer-code-NT1Q3GZVFI">Photo</a> by <a href="https://stocksnap.io/author/morillo">Christina Morillo</a> on <a href="https://stocksnap.io">StockSnap</a>
