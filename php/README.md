# MetMuseumCollection PHP SDK



The PHP SDK for the MetMuseumCollection API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/met-museum-collection-sdk/releases](https://github.com/voxgig-sdk/met-museum-collection-sdk/releases)


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
    // list() returns an array of Department records — iterate directly.
    $departments = $client->Department()->list();
    foreach ($departments as $item) {
        echo $item["id"] . " " . $item["name"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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
    "entity" => ["department" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$department = $client->Department()->load(["id" => "test01"]);
print_r($department);
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
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

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
| `department_id` |  |
| `display_name` |  |

Operations: List.

API path: `/departments`

#### Object

| Field | Description |
| --- | --- |
| `accession_number` |  |
| `accession_year` |  |
| `additional_image` |  |
| `artist_alpha_sort` |  |
| `artist_begin_date` |  |
| `artist_display_bio` |  |
| `artist_display_name` |  |
| `artist_end_date` |  |
| `artist_gender` |  |
| `artist_nationality` |  |
| `artist_prefix` |  |
| `artist_role` |  |
| `artist_suffix` |  |
| `artist_ulan_url` |  |
| `artist_wikidata_url` |  |
| `city` |  |
| `classification` |  |
| `constituent` |  |
| `country` |  |
| `county` |  |
| `credit_line` |  |
| `culture` |  |
| `department` |  |
| `dimension` |  |
| `dimensions_parsed` |  |
| `dynasty` |  |
| `excavation` |  |
| `gallery_number` |  |
| `geography_type` |  |
| `is_highlight` |  |
| `is_public_domain` |  |
| `is_timeline_work` |  |
| `link_resource` |  |
| `locale` |  |
| `locus` |  |
| `measurement` |  |
| `medium` |  |
| `metadata_date` |  |
| `object_begin_date` |  |
| `object_date` |  |
| `object_end_date` |  |
| `object_i_d` |  |
| `object_id` |  |
| `object_name` |  |
| `object_url` |  |
| `object_wikidata_url` |  |
| `period` |  |
| `portfolio` |  |
| `primary_image` |  |
| `primary_image_small` |  |
| `region` |  |
| `reign` |  |
| `repository` |  |
| `rights_and_reproduction` |  |
| `river` |  |
| `state` |  |
| `subregion` |  |
| `tag` |  |
| `title` |  |
| `total` |  |

Operations: List, Load.

API path: `/objects`

#### Search

| Field | Description |
| --- | --- |
| `object_i_d` |  |
| `total` |  |

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
| `department_id` | ``$INTEGER`` |  |
| `display_name` | ``$STRING`` |  |

#### Example: List

```php
// list() returns an array of Department records (throws on error).
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
| `accession_number` | ``$STRING`` |  |
| `accession_year` | ``$STRING`` |  |
| `additional_image` | ``$ARRAY`` |  |
| `artist_alpha_sort` | ``$STRING`` |  |
| `artist_begin_date` | ``$STRING`` |  |
| `artist_display_bio` | ``$STRING`` |  |
| `artist_display_name` | ``$STRING`` |  |
| `artist_end_date` | ``$STRING`` |  |
| `artist_gender` | ``$STRING`` |  |
| `artist_nationality` | ``$STRING`` |  |
| `artist_prefix` | ``$STRING`` |  |
| `artist_role` | ``$STRING`` |  |
| `artist_suffix` | ``$STRING`` |  |
| `artist_ulan_url` | ``$STRING`` |  |
| `artist_wikidata_url` | ``$STRING`` |  |
| `city` | ``$STRING`` |  |
| `classification` | ``$STRING`` |  |
| `constituent` | ``$ARRAY`` |  |
| `country` | ``$STRING`` |  |
| `county` | ``$STRING`` |  |
| `credit_line` | ``$STRING`` |  |
| `culture` | ``$STRING`` |  |
| `department` | ``$STRING`` |  |
| `dimension` | ``$STRING`` |  |
| `dimensions_parsed` | ``$ARRAY`` |  |
| `dynasty` | ``$STRING`` |  |
| `excavation` | ``$STRING`` |  |
| `gallery_number` | ``$STRING`` |  |
| `geography_type` | ``$STRING`` |  |
| `is_highlight` | ``$BOOLEAN`` |  |
| `is_public_domain` | ``$BOOLEAN`` |  |
| `is_timeline_work` | ``$BOOLEAN`` |  |
| `link_resource` | ``$STRING`` |  |
| `locale` | ``$STRING`` |  |
| `locus` | ``$STRING`` |  |
| `measurement` | ``$ARRAY`` |  |
| `medium` | ``$STRING`` |  |
| `metadata_date` | ``$STRING`` |  |
| `object_begin_date` | ``$INTEGER`` |  |
| `object_date` | ``$STRING`` |  |
| `object_end_date` | ``$INTEGER`` |  |
| `object_i_d` | ``$ARRAY`` |  |
| `object_id` | ``$INTEGER`` |  |
| `object_name` | ``$STRING`` |  |
| `object_url` | ``$STRING`` |  |
| `object_wikidata_url` | ``$STRING`` |  |
| `period` | ``$STRING`` |  |
| `portfolio` | ``$STRING`` |  |
| `primary_image` | ``$STRING`` |  |
| `primary_image_small` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `reign` | ``$STRING`` |  |
| `repository` | ``$STRING`` |  |
| `rights_and_reproduction` | ``$STRING`` |  |
| `river` | ``$STRING`` |  |
| `state` | ``$STRING`` |  |
| `subregion` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |
| `title` | ``$STRING`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```php
// load() returns the bare Object record (throws on error).
$object = $client->Object()->load(["id" => "object_id"]);
```

#### Example: List

```php
// list() returns an array of Object records (throws on error).
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
| `object_i_d` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: List

```php
// list() returns an array of Search records (throws on error).
$searchs = $client->Search()->list();
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$department = $client->Department();
$department->load(["id" => "example_id"]);

// $department->dataGet() now returns the loaded department data
// $department->matchGet() returns the last match criteria
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
