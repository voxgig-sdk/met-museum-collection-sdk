# MetMuseumCollection PHP SDK Reference

Complete API reference for the MetMuseumCollection PHP SDK.


## MetMuseumCollectionSDK

### Constructor

```php
require_once __DIR__ . '/met-museum-collection_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
| `department_id` | ``$INTEGER`` | No |  |
| `display_name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Department()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DepartmentEntity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ObjectEntity

```php
$object = $client->Object();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accession_number` | ``$STRING`` | No |  |
| `accession_year` | ``$STRING`` | No |  |
| `additional_image` | ``$ARRAY`` | No |  |
| `artist_alpha_sort` | ``$STRING`` | No |  |
| `artist_begin_date` | ``$STRING`` | No |  |
| `artist_display_bio` | ``$STRING`` | No |  |
| `artist_display_name` | ``$STRING`` | No |  |
| `artist_end_date` | ``$STRING`` | No |  |
| `artist_gender` | ``$STRING`` | No |  |
| `artist_nationality` | ``$STRING`` | No |  |
| `artist_prefix` | ``$STRING`` | No |  |
| `artist_role` | ``$STRING`` | No |  |
| `artist_suffix` | ``$STRING`` | No |  |
| `artist_ulan_url` | ``$STRING`` | No |  |
| `artist_wikidata_url` | ``$STRING`` | No |  |
| `city` | ``$STRING`` | No |  |
| `classification` | ``$STRING`` | No |  |
| `constituent` | ``$ARRAY`` | No |  |
| `country` | ``$STRING`` | No |  |
| `county` | ``$STRING`` | No |  |
| `credit_line` | ``$STRING`` | No |  |
| `culture` | ``$STRING`` | No |  |
| `department` | ``$STRING`` | No |  |
| `dimension` | ``$STRING`` | No |  |
| `dimensions_parsed` | ``$ARRAY`` | No |  |
| `dynasty` | ``$STRING`` | No |  |
| `excavation` | ``$STRING`` | No |  |
| `gallery_number` | ``$STRING`` | No |  |
| `geography_type` | ``$STRING`` | No |  |
| `is_highlight` | ``$BOOLEAN`` | No |  |
| `is_public_domain` | ``$BOOLEAN`` | No |  |
| `is_timeline_work` | ``$BOOLEAN`` | No |  |
| `link_resource` | ``$STRING`` | No |  |
| `locale` | ``$STRING`` | No |  |
| `locus` | ``$STRING`` | No |  |
| `measurement` | ``$ARRAY`` | No |  |
| `medium` | ``$STRING`` | No |  |
| `metadata_date` | ``$STRING`` | No |  |
| `object_begin_date` | ``$INTEGER`` | No |  |
| `object_date` | ``$STRING`` | No |  |
| `object_end_date` | ``$INTEGER`` | No |  |
| `object_i_d` | ``$ARRAY`` | No |  |
| `object_id` | ``$INTEGER`` | No |  |
| `object_name` | ``$STRING`` | No |  |
| `object_url` | ``$STRING`` | No |  |
| `object_wikidata_url` | ``$STRING`` | No |  |
| `period` | ``$STRING`` | No |  |
| `portfolio` | ``$STRING`` | No |  |
| `primary_image` | ``$STRING`` | No |  |
| `primary_image_small` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |
| `reign` | ``$STRING`` | No |  |
| `repository` | ``$STRING`` | No |  |
| `rights_and_reproduction` | ``$STRING`` | No |  |
| `river` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |
| `subregion` | ``$STRING`` | No |  |
| `tag` | ``$ARRAY`` | No |  |
| `title` | ``$STRING`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Object()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Object()->load(["id" => "object_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ObjectEntity`

Create a new `ObjectEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Search()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `getName(): string`

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

