# MetMuseumCollection Golang SDK Reference

Complete API reference for the MetMuseumCollection Golang SDK.


## MetMuseumCollectionSDK

### Constructor

```go
func NewMetMuseumCollectionSDK(options map[string]any) *MetMuseumCollectionSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *MetMuseumCollectionSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *MetMuseumCollectionSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Department(data map[string]any) MetMuseumCollectionEntity`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Object(data map[string]any) MetMuseumCollectionEntity`

Create a new `Object` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) MetMuseumCollectionEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DepartmentEntity

```go
department := client.Department(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `display_name` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Department(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ObjectEntity

```go
object := client.Object(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Object(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Object(nil).Load(map[string]any{"id": "object_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ObjectEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewMetMuseumCollectionSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

