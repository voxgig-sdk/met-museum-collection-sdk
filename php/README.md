# MetMuseumCollection PHP SDK



The PHP SDK for the MetMuseumCollection API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Department()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/met-museum-collection-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/met-museum-collection-sdk
composer config repositories.met-museum-collection-sdk path ./met-museum-collection-sdk/php
composer require voxgig-sdk/met-museum-collection-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'metmuseumcollection_sdk.php';

$client = new MetMuseumCollectionSDK();
```

### 2. List department records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $departments = $client->Department()->list();
    foreach ($departments as $record) {
        $item = $record->data_get();
        echo $item["departmentId"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $searchs = $client->Search()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = MetMuseumCollectionSDK::test([
    "entity" => ["object" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$object = $client->Object()->list();
print_r(array_map(fn($item) => $item->data_get(), $object));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new MetMuseumCollectionSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### MetMuseumCollectionSDK

```php
require_once 'metmuseumcollection_sdk.php';
$client = new MetMuseumCollectionSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = MetMuseumCollectionSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### MetMuseumCollectionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Department` | `($data): DepartmentEntity` | Create a Department entity instance. |
| `Object` | `($data): ObjectEntity` | Create an Object entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Department

| Field | Description |
| --- | --- |
| `departmentId` | Unique identifier for the department |
| `displayName` | Display name of the department |

Operations: List.

API path: `/departments`

#### Object

| Field | Description |
| --- | --- |
| `GalleryNumber` | Gallery number, where available |
| `accessionNumber` | Identifying number for each artwork (not always unique) |
| `accessionYear` | Year the artwork was acquired |
| `additionalImages` | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | Used to sort artist names alphabetically |
| `artistBeginDate` | Year the artist was born |
| `artistDisplayBio` | Nationality and life dates of an artist |
| `artistDisplayName` | Artist name in the correct order for display |
| `artistEndDate` | Year the artist died |
| `artistGender` | Gender of the artist (currently contains female designations only) |
| `artistNationality` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | ULAN URL for the artist |
| `artistWikidata_URL` | Wikidata URL for the artist |
| `city` | City where the artwork was created |
| `classification` | General term describing the artwork type |
| `constituents` | An array containing the constituents associated with an object |
| `country` | Country where the artwork was created or found |
| `county` | County where the artwork was created |
| `creditLine` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | Information about the culture, or people from which an object was created |
| `department` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | Size of the artwork or object |
| `dimensionsParsed` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | Dynasty under which an object was created |
| `excavation` | The name of an excavation |
| `geographyType` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` |  |
| `isHighlight` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | Whether the object is on the Timeline of Art History website |
| `linkResource` | URL to object's page on metmuseum.org |
| `locale` | Geographic location more specific than subregion |
| `locus` | Geographic location that is less specific than locale |
| `measurements` | Array of elements with measurements. |
| `medium` | Refers to the materials that were used to create the artwork |
| `metadataDate` | Date metadata was last updated |
| `objectBeginDate` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | Machine readable date indicating the year the artwork was completed |
| `objectID` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | An array containing the object ID of publicly-available objects |
| `objectName` | Describes the physical type of the object |
| `objectURL` | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | Wikidata URL for the object |
| `period` | Time or time period when an object was created |
| `portfolio` | A set of works created as a group or published as a series |
| `primaryImage` | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | URL to the lower-res primary image of an object in JPEG format |
| `region` | Geographic location more specific than country |
| `reign` | Reign of a monarch or ruler under which an object was created |
| `repository` | Repository information |
| `rightsAndReproduction` | Credit line for artworks still under copyright |
| `river` | River related to the origins of an artwork |
| `state` | State or province where the artwork was created |
| `subregion` | Geographic location more specific than Region |
| `tags` | An array of subject keyword tags associated with the object |
| `title` | Title, identifying phrase, or name given to a work of art |
| `total` | The total number of publicly-available objects |

Operations: List, Load.

API path: `/objects`

#### Search

| Field | Description |
| --- | --- |
| `objectIDs` | An array containing the object IDs of matching objects |
| `total` | The total number of objects matching the search query |

Operations: List.

API path: `/search`



## Entities


### Department

Create an instance: `$department = $client->Department();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Unique identifier for the department |
| `displayName` | `string` | Display name of the department |

#### Example: List

```php
// list() returns an array of Department entities, one per record (throws on error).
$departments = $client->Department()->list();
```


### Object

Create an instance: `$object = $client->Object();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `GalleryNumber` | `string` | Gallery number, where available |
| `accessionNumber` | `string` | Identifying number for each artwork (not always unique) |
| `accessionYear` | `string` | Year the artwork was acquired |
| `additionalImages` | `array` | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `string` | Used to sort artist names alphabetically |
| `artistBeginDate` | `string` | Year the artist was born |
| `artistDisplayBio` | `string` | Nationality and life dates of an artist |
| `artistDisplayName` | `string` | Artist name in the correct order for display |
| `artistEndDate` | `string` | Year the artist died |
| `artistGender` | `string` | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `string` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `string` | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `string` | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `string` | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `string` | ULAN URL for the artist |
| `artistWikidata_URL` | `string` | Wikidata URL for the artist |
| `city` | `string` | City where the artwork was created |
| `classification` | `string` | General term describing the artwork type |
| `constituents` | `array` | An array containing the constituents associated with an object |
| `country` | `string` | Country where the artwork was created or found |
| `county` | `string` | County where the artwork was created |
| `creditLine` | `string` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `string` | Information about the culture, or people from which an object was created |
| `department` | `string` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `string` | Size of the artwork or object |
| `dimensionsParsed` | `array` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `string` | Dynasty under which an object was created |
| `excavation` | `string` | The name of an excavation |
| `geographyType` | `string` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `string` |  |
| `isHighlight` | `bool` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `bool` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `bool` | Whether the object is on the Timeline of Art History website |
| `linkResource` | `string` | URL to object's page on metmuseum.org |
| `locale` | `string` | Geographic location more specific than subregion |
| `locus` | `string` | Geographic location that is less specific than locale |
| `measurements` | `array` | Array of elements with measurements. |
| `medium` | `string` | Refers to the materials that were used to create the artwork |
| `metadataDate` | `string` | Date metadata was last updated |
| `objectBeginDate` | `int` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `string` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `int` | Machine readable date indicating the year the artwork was completed |
| `objectID` | `int` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `array` | An array containing the object ID of publicly-available objects |
| `objectName` | `string` | Describes the physical type of the object |
| `objectURL` | `string` | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `string` | Wikidata URL for the object |
| `period` | `string` | Time or time period when an object was created |
| `portfolio` | `string` | A set of works created as a group or published as a series |
| `primaryImage` | `string` | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `string` | URL to the lower-res primary image of an object in JPEG format |
| `region` | `string` | Geographic location more specific than country |
| `reign` | `string` | Reign of a monarch or ruler under which an object was created |
| `repository` | `string` | Repository information |
| `rightsAndReproduction` | `string` | Credit line for artworks still under copyright |
| `river` | `string` | River related to the origins of an artwork |
| `state` | `string` | State or province where the artwork was created |
| `subregion` | `string` | Geographic location more specific than Region |
| `tags` | `array` | An array of subject keyword tags associated with the object |
| `title` | `string` | Title, identifying phrase, or name given to a work of art |
| `total` | `int` | The total number of publicly-available objects |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Object record (throws on error).
$object = $client->Object()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Object entities, one per record (throws on error).
$objects = $client->Object()->list();
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `objectIDs` | `array` | An array containing the object IDs of matching objects |
| `total` | `int` | The total number of objects matching the search query |

#### Example: List

```php
// list() returns an array of Search entities, one per record (throws on error).
$searchs = $client->Search()->list();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── metmuseumcollection_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`metmuseumcollection_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$search = $client->Search();
$search->list();

// $search->data_get() now returns the search data from the last list
// $search->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
