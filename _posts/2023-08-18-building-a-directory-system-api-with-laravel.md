---
title: Building a directory system API in Laravel
description: Building a directory system API in Laravel to match the Open Referral UK data standard
layout: post
date: 2023-08-18 17:00:07
hero_image: /img/building-a-directory-in-laravel.jpg
hero_height: is-large
hero_darken: true
image: /img/building-a-directory-in-laravel.jpg
tags: Laravel API OpenReferral
---

Sometimes it’s difficult to know whether to buy a system, use an existing open source system, or even build your own system. Each approach has its own risks and rewards. As a developer sometimes you get the opportunity to try things out and build a prototype to see what is possible. I recently got this chance and built a prototype for an API.

Long story short, we needed a directory system and after a bit of research I came upon the Open Referral UK data standard and decided to try this out and build a prototype. The main concept of the Open Referral UK standard is that each directory listing is a service. Each service has many locations, contacts, taxonomies, opening times, etc. and a service belongs to an Organization.

I have used Laravel to build simple API endpoints for use in projects that use JavaScript frontends so I knew a bit about using Laravel Resources and Resource Collections, but I always had free reign to decide how the API response should be structured. This time I had to build an API to follow an existing standard.

## Creating the models

I started out by creating the Organization model, migration and factory, then created the Service model, migration and factory.

```bash
php artisan make:model Organization -mf
php artisan make:model Service -mf
```

We know the service belongs to an organization so we can define this relationship in the Service model.

```php
// App\Models\Service

use Illuminate\Database\Eloquent\Relations\BelongsTo;

public function organization(): BelongsTo
{
    return $this->belongsTo(Organization::class);
}
```

And we can define the inverse relationship in the Organization model, which is a HasMany relationship.

```php
// App\Models\Organization

use Illuminate\Database\Eloquent\Relations\HasMany;

public function services(): HasMany
{
    return $this->hasMany(Service::class);
}
```

Next I updated the migrations and the factories with the required fields. This is a lot to cover and outside of the scope of this article, but if you are interested, the data structure is available on the [Open Referral website](https://developers.openreferraluk.org/Guidance/#data-structure).

Once the migrations and factories had been created, I could migrate the database and then make some services using tinker.

```bash
php artisan migrate

php artisan tinker
Service::factory()->count(100)->create();
```

## API Controller

Next I created an API Controller for the services endpoint (that lists pages of services).

```bash
php artisan make:controller Api/ServiceController
```

And then I hooked it up to a route in the routes/api.php file.

```php
// routes/api.php

Route::get('/services', [ServiceController::class, 'index'])
    ->name('services');
```

## Resource and Collection

I now needed a Resource and a Collection file for the service so created these and then used them to return services on the API endpoint. The resource allows us to transform our Service model to the format we want and the collection allows us to transform a collection of Service models.

```bash
php artisan make:resource ServiceCollection
php artisan make:resource ServiceResource
```

Then I could hook the ServiceCollection up in my ServiceController. This gets a page of Services and passes it into the ServiceCollection to output the format we need.

```php
// App\Http\Controllers\Api\ServiceController

public function index()
{
    return new ServiceCollection(Service::query()->paginate());
}
```

Good news, I now had some data returning when I visted `/api/services`. The bad news, the data format didn’t match the standard.

## Custom wrapper

The first thing I had to change was the data wrapper in the ServiceCollection. By default Laravel uses ‘data’ as it’s wrapper, but it has an easy way of [changing the wrapper](https://laravel.com/docs/10.x/eloquent-resources#data-wrapping) using the `$wrap` attribute on your resource.

```php
// App\Http\Resources\ServiceCollection

public static $wrap = 'content';
```

## Pagination Information

The next issue was that Laravel wraps all of the metadata nice and neatly in the meta and links objects, but the Open Referral standard was very different. I actually prefer the standard Laravel format, but the task was to meet the standard, so I had to find a solution.

Again, Laravel offers a [paginationInformation method](https://laravel.com/docs/10.x/eloquent-resources#customizing-the-pagination-information) for your collection that lets you override the default metadata.

Here I am using the $paginated array to remap the values to the required format. I used `dd($paginated);` to find out what properties were available in the array to know what was available and how to map the values.

I unset the links and meta array keys as these aren't needed in the data standard, before returning the $default array.

```php
// App\Http\Resources\ServiceCollection

public function paginationInformation($request, $paginated, $default)
{
    $default['totalElements'] = $paginated['total'];
    $default['totalPages'] = $paginated['last_page'];
    $default['number'] = $paginated['current_page'];
    $default['size'] = $paginated['per_page'];
    $default['first'] = $paginated['current_page'] === 1;
    $default['last'] = $paginated['current_page'] === $paginated['last_page'];

    unset($default['links']);
    unset($default['meta']);

    return $default;
}
```

## Customising the Service

I now had data returning, it was wrapped in the correct 'content' wrapper and the pagination information was now correct. Next I had to customise the service data that was returned. When you create a resource it has the standard placeholder.

```php
return parent::toArray($request);
```

This is designed to be replaced with an array of fields that you want to return, in our case the data that the API wants to provide about a service. Something like this:

```php
// App\Http\Resources\ServiceResource

public function toArray($request)
{
    return [
        'id' => $this->uuid,
        'accreditations' => $this->accreditations,
        'assured_date' => $this->assured_date?->format('Y-m-d'),
        'attending_access' => $this->attending_access,
        'attending_type' => $this->attending_type,
        'contacts' => [],
        'cost_options' => [],
        'deliverable_type' => $this->deliverable_type,
        'description' => $this->description,
        'eligibilitys' => [],
        'email' => $this->email,
        'fees' => $this->fees,
        'fundings' => [],
        'holiday_schedules' => [],
        'languages' => [],
        'name' => $this->name,
        'organization' => [],
        'regular_schedules' => [],
        'reviews' => [],
        'service_areas' => [],
        'service_at_locations' => [],
        'service_taxonomys' => [],
        'status' => $this->status,
        'url' => $this->url,
    ];
}
```

As you can see, there are a lot of empty arrays being returned right now. These are all of the additional relationships that belong to the service that all need creating so they are placeholders for now until they are built.

## Adding the Organization to the Service

As we have our Organization model created we can use this to show how the Organization data can be returned from this service endpoint.

First we need to create an Organization resource that will map all of the fields into the array we want to return.

```bash
php artisan make:resource OrganizationResource
```

Once it has been created we can customise it to return the data in the expected format for the data standard.

```php
// App\Http\Resources\OrganizationResource

public function toArray($request)
{
    return [
        'id' => $this->uuid,
        'description' => $this->description,
        'logo' => $this->logo ? Storage::url($this->logo) : '',
        'name' => $this->name,
        'reviews' => [],
        'uri' => $this->uri,
        'url' => $this->url,
    ];
}
```

Now we can map our OrganizationResource within our ServiceResource class, passing in the related organization.

```php
// App\Http\Resources\ServiceResource

'organization' => new OrganizationResource($this->organization),
```

To prevent lazy loading we also need to update our query in the ServiceController to include the organization relationship.

```php
// App\Http\Controllers\Api\ServiceController

public function index()
{
    Return new ServiceCollection(Service::query()
        ->with('organization')
        ->paginate());
}
```

## Visiting the endpoint

Now, when I visit the `/api/services` endpoint I can see a json response that matches the Open Referral UK data format, including the service's organization.

As we are using the `paginate()` method in the Service query we can pass in a query parameter `page` to get the next page of data, such as `/api/services?page=2` to get page 2 of services data.

## Searching for a service by name

We can adjust our query to allow us to search for a service by name when the text get parameter is provided.

```php
// App\Http\Controllers\Api\ServiceController

public function index(Request $request)
{
	return new ServiceCollection(Service::query()
        ->with('organization')
        ->when($request->get('text'), function (Builder $query) use ($request) {
            $query->where('name', 'like', "%{$request->get('text')}%";
        })
        ->paginate());
}
```

Now when we visit the endpoint `/api/services?text=test` it will return services that contain 'test' in their name.

## Displaying an individual service

To display an individual service we can make use of a lot of the work we have already done. Start with creating a new route in routes/api.php

```php
// routes/api.php

Route::get('/services/{service}', [ServiceController::class, 'show'])
    ->name('services.show');
```

Then we can create a show method on the Service Controller to return the individual service data. We can use [Route Model Binding](https://laravel.com/docs/10.x/routing#route-model-binding) to automatically find the service from the route, then we just need to load the organization data, before finally returning the same ServiceResource that we created previously, passing in the service.

```php
// App\Http\Controllers\Api\ServiceController

public function show(Service $service)
{
    $service->load('organization');

    return new ServiceResource($service);
}
```

Now when we visit `/api/services/1` we get returned the JSON response for the service with id 1.

## What next?

From here we can build up the API to return the additional relationships for the service and we can update the query to search the services. We will also need a frontend so that we can manage the service data.

There is a lot of work to do from here, but hopefully this shows you how you can completely customise the API responses to suit your needs and easily return related data too.

<a href="https://stocksnap.io/photo/woman-business-JK1WUKX3VR">Photo</a> by <a href="https://stocksnap.io/author/directmedia">Direct Media</a> on <a href="https://stocksnap.io">StockSnap</a>
