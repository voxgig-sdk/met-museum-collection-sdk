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
fmt.Println(department.GetName()) // "department"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `int` | No |  |
| `display_name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Department(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(object.GetName()) // "object"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accession_number` | `string` | No |  |
| `accession_year` | `string` | No |  |
| `additional_image` | `[]any` | No |  |
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
| `constituent` | `[]any` | No |  |
| `country` | `string` | No |  |
| `county` | `string` | No |  |
| `credit_line` | `string` | No |  |
| `culture` | `string` | No |  |
| `department` | `string` | No |  |
| `dimension` | `string` | No |  |
| `dimensions_parsed` | `[]any` | No |  |
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
| `measurement` | `[]any` | No |  |
| `medium` | `string` | No |  |
| `metadata_date` | `string` | No |  |
| `object_begin_date` | `int` | No |  |
| `object_date` | `string` | No |  |
| `object_end_date` | `int` | No |  |
| `object_i_d` | `[]any` | No |  |
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
| `tag` | `[]any` | No |  |
| `title` | `string` | No |  |
| `total` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Object(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Object(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | `[]any` | No |  |
| `total` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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

