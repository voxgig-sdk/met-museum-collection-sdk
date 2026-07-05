# MetMuseumCollection PHP SDK Reference

Complete API reference for the MetMuseumCollection PHP SDK.


## MetMuseumCollectionSDK

### Constructor

```php
require_once __DIR__ . '/metmuseumcollection_sdk.php';

$client = new MetMuseumCollectionSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MetMuseumCollectionSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = MetMuseumCollectionSDK::test();
```


### Instance Methods

#### `Department($data = null)`

Create a new `DepartmentEntity` instance. Pass `null` for no initial data.

#### `Object($data = null)`

Create a new `ObjectEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): MetMuseumCollectionUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DepartmentEntity

```php
$department = $client->Department();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `int` | No |  |
| `display_name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Department()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DepartmentEntity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ObjectEntity

```php
$object = $client->Object();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accession_number` | `string` | No |  |
| `accession_year` | `string` | No |  |
| `additional_image` | `array` | No |  |
| `artist_alpha_sort` | `string` | No |  |
| `artist_begin_date` | `string` | No |  |
| `artist_display_bio` | `string` | No |  |
| `artist_display_name` | `string` | No |  |
| `artist_end_date` | `string` | No |  |
| `artist_gender` | `string` | No |  |
| `artist_nationality` | `string` | No |  |
| `artist_prefix` | `string` | No |  |
| `artist_role` | `string` | No |  |
| `artist_suffix` | `string` | No |  |
| `artist_ulan_url` | `string` | No |  |
| `artist_wikidata_url` | `string` | No |  |
| `city` | `string` | No |  |
| `classification` | `string` | No |  |
| `constituent` | `array` | No |  |
| `country` | `string` | No |  |
| `county` | `string` | No |  |
| `credit_line` | `string` | No |  |
| `culture` | `string` | No |  |
| `department` | `string` | No |  |
| `dimension` | `string` | No |  |
| `dimensions_parsed` | `array` | No |  |
| `dynasty` | `string` | No |  |
| `excavation` | `string` | No |  |
| `gallery_number` | `string` | No |  |
| `geography_type` | `string` | No |  |
| `is_highlight` | `bool` | No |  |
| `is_public_domain` | `bool` | No |  |
| `is_timeline_work` | `bool` | No |  |
| `link_resource` | `string` | No |  |
| `locale` | `string` | No |  |
| `locus` | `string` | No |  |
| `measurement` | `array` | No |  |
| `medium` | `string` | No |  |
| `metadata_date` | `string` | No |  |
| `object_begin_date` | `int` | No |  |
| `object_date` | `string` | No |  |
| `object_end_date` | `int` | No |  |
| `object_i_d` | `array` | No |  |
| `object_id` | `int` | No |  |
| `object_name` | `string` | No |  |
| `object_url` | `string` | No |  |
| `object_wikidata_url` | `string` | No |  |
| `period` | `string` | No |  |
| `portfolio` | `string` | No |  |
| `primary_image` | `string` | No |  |
| `primary_image_small` | `string` | No |  |
| `region` | `string` | No |  |
| `reign` | `string` | No |  |
| `repository` | `string` | No |  |
| `rights_and_reproduction` | `string` | No |  |
| `river` | `string` | No |  |
| `state` | `string` | No |  |
| `subregion` | `string` | No |  |
| `tag` | `array` | No |  |
| `title` | `string` | No |  |
| `total` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Object()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Object()->load(["id" => "object_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ObjectEntity`

Create a new `ObjectEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | `array` | No |  |
| `total` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Search()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new MetMuseumCollectionSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

