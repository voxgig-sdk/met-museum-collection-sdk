# MetMuseumCollection Ruby SDK Reference

Complete API reference for the MetMuseumCollection Ruby SDK.


## MetMuseumCollectionSDK

### Constructor

```ruby
require_relative 'MetMuseumCollection_sdk'

client = MetMuseumCollectionSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MetMuseumCollectionSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = MetMuseumCollectionSDK.test
```


### Instance Methods

#### `Department(data = nil)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Object(data = nil)`

Create a new `Object` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DepartmentEntity

```ruby
department = client.Department
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `Integer` | No |  |
| `displayName` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Department.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ObjectEntity

```ruby
object = client.Object
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `GalleryNumber` | `String` | No |  |
| `accessionNumber` | `String` | No |  |
| `accessionYear` | `String` | No |  |
| `additionalImages` | `Array` | No |  |
| `artistAlphaSort` | `String` | No |  |
| `artistBeginDate` | `String` | No |  |
| `artistDisplayBio` | `String` | No |  |
| `artistDisplayName` | `String` | No |  |
| `artistEndDate` | `String` | No |  |
| `artistGender` | `String` | No |  |
| `artistNationality` | `String` | No |  |
| `artistPrefix` | `String` | No |  |
| `artistRole` | `String` | No |  |
| `artistSuffix` | `String` | No |  |
| `artistULAN_URL` | `String` | No |  |
| `artistWikidata_URL` | `String` | No |  |
| `city` | `String` | No |  |
| `classification` | `String` | No |  |
| `constituents` | `Array` | No |  |
| `country` | `String` | No |  |
| `county` | `String` | No |  |
| `creditLine` | `String` | No |  |
| `culture` | `String` | No |  |
| `department` | `String` | No |  |
| `dimensions` | `String` | No |  |
| `dimensionsParsed` | `Array` | No |  |
| `dynasty` | `String` | No |  |
| `excavation` | `String` | No |  |
| `geographyType` | `String` | No |  |
| `isHighlight` | `Boolean` | No |  |
| `isPublicDomain` | `Boolean` | No |  |
| `isTimelineWork` | `Boolean` | No |  |
| `linkResource` | `String` | No |  |
| `locale` | `String` | No |  |
| `locus` | `String` | No |  |
| `measurements` | `Array` | No |  |
| `medium` | `String` | No |  |
| `metadataDate` | `String` | No |  |
| `objectBeginDate` | `Integer` | No |  |
| `objectDate` | `String` | No |  |
| `objectEndDate` | `Integer` | No |  |
| `objectID` | `Integer` | No |  |
| `objectIDs` | `Array` | No |  |
| `objectName` | `String` | No |  |
| `objectURL` | `String` | No |  |
| `objectWikidata_URL` | `String` | No |  |
| `period` | `String` | No |  |
| `portfolio` | `String` | No |  |
| `primaryImage` | `String` | No |  |
| `primaryImageSmall` | `String` | No |  |
| `region` | `String` | No |  |
| `reign` | `String` | No |  |
| `repository` | `String` | No |  |
| `rightsAndReproduction` | `String` | No |  |
| `river` | `String` | No |  |
| `state` | `String` | No |  |
| `subregion` | `String` | No |  |
| `tags` | `Array` | No |  |
| `title` | `String` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Object.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Object.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ObjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `objectIDs` | `Array` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Search.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = MetMuseumCollectionSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

