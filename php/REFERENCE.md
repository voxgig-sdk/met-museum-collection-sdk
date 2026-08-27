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
| `departmentId` | `int` | No | Unique identifier for the department |
| `displayName` | `string` | No | Display name of the department |

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
| `GalleryNumber` | `string` | No | Gallery number, where available |
| `accessionNumber` | `string` | No | Identifying number for each artwork (not always unique) |
| `accessionYear` | `string` | No | Year the artwork was acquired |
| `additionalImages` | `array` | No | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `string` | No | Used to sort artist names alphabetically |
| `artistBeginDate` | `string` | No | Year the artist was born |
| `artistDisplayBio` | `string` | No | Nationality and life dates of an artist |
| `artistDisplayName` | `string` | No | Artist name in the correct order for display |
| `artistEndDate` | `string` | No | Year the artist died |
| `artistGender` | `string` | No | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `string` | No | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `string` | No | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `string` | No | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `string` | No | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `string` | No | ULAN URL for the artist |
| `artistWikidata_URL` | `string` | No | Wikidata URL for the artist |
| `city` | `string` | No | City where the artwork was created |
| `classification` | `string` | No | General term describing the artwork type |
| `constituents` | `array` | No | An array containing the constituents associated with an object |
| `country` | `string` | No | Country where the artwork was created or found |
| `county` | `string` | No | County where the artwork was created |
| `creditLine` | `string` | No | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `string` | No | Information about the culture, or people from which an object was created |
| `department` | `string` | No | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `string` | No | Size of the artwork or object |
| `dimensionsParsed` | `array` | No | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `string` | No | Dynasty under which an object was created |
| `excavation` | `string` | No | The name of an excavation |
| `geographyType` | `string` | No | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `string` | No |  |
| `isHighlight` | `bool` | No | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `bool` | No | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `bool` | No | Whether the object is on the Timeline of Art History website |
| `linkResource` | `string` | No | URL to object's page on metmuseum.org |
| `locale` | `string` | No | Geographic location more specific than subregion |
| `locus` | `string` | No | Geographic location that is less specific than locale |
| `measurements` | `array` | No | Array of elements with measurements. |
| `medium` | `string` | No | Refers to the materials that were used to create the artwork |
| `metadataDate` | `string` | No | Date metadata was last updated |
| `objectBeginDate` | `int` | No | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `string` | No | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `int` | No | Machine readable date indicating the year the artwork was completed |
| `objectID` | `int` | No | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `array` | No | An array containing the object ID of publicly-available objects |
| `objectName` | `string` | No | Describes the physical type of the object |
| `objectURL` | `string` | No | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `string` | No | Wikidata URL for the object |
| `period` | `string` | No | Time or time period when an object was created |
| `portfolio` | `string` | No | A set of works created as a group or published as a series |
| `primaryImage` | `string` | No | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `string` | No | URL to the lower-res primary image of an object in JPEG format |
| `region` | `string` | No | Geographic location more specific than country |
| `reign` | `string` | No | Reign of a monarch or ruler under which an object was created |
| `repository` | `string` | No | Repository information |
| `rightsAndReproduction` | `string` | No | Credit line for artworks still under copyright |
| `river` | `string` | No | River related to the origins of an artwork |
| `state` | `string` | No | State or province where the artwork was created |
| `subregion` | `string` | No | Geographic location more specific than Region |
| `tags` | `array` | No | An array of subject keyword tags associated with the object |
| `title` | `string` | No | Title, identifying phrase, or name given to a work of art |
| `total` | `int` | No | The total number of publicly-available objects |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Object()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Object()->load(["id" => 1]);
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
| `objectIDs` | `array` | No | An array containing the object IDs of matching objects |
| `total` | `int` | No | The total number of objects matching the search query |

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

