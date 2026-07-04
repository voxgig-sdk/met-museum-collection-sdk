# MetMuseumCollection Lua SDK Reference

Complete API reference for the MetMuseumCollection Lua SDK.


## MetMuseumCollectionSDK

### Constructor

```lua
local sdk = require("met-museum-collection_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Department(data)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Object(data)`

Create a new `Object` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DepartmentEntity

```lua
local department = client:department(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `display_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:department():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ObjectEntity

```lua
local object = client:object(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:object():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:object():load({ id = "object_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ObjectEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:search():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

