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
local department = client:Department(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | `number` | No |  |
| `display_name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Department():list()
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
local object = client:Object(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accession_number` | `string` | No |  |
| `accession_year` | `string` | No |  |
| `additional_image` | `table` | No |  |
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
| `constituent` | `table` | No |  |
| `country` | `string` | No |  |
| `county` | `string` | No |  |
| `credit_line` | `string` | No |  |
| `culture` | `string` | No |  |
| `department` | `string` | No |  |
| `dimension` | `string` | No |  |
| `dimensions_parsed` | `table` | No |  |
| `dynasty` | `string` | No |  |
| `excavation` | `string` | No |  |
| `gallery_number` | `string` | No |  |
| `geography_type` | `string` | No |  |
| `is_highlight` | `boolean` | No |  |
| `is_public_domain` | `boolean` | No |  |
| `is_timeline_work` | `boolean` | No |  |
| `link_resource` | `string` | No |  |
| `locale` | `string` | No |  |
| `locus` | `string` | No |  |
| `measurement` | `table` | No |  |
| `medium` | `string` | No |  |
| `metadata_date` | `string` | No |  |
| `object_begin_date` | `number` | No |  |
| `object_date` | `string` | No |  |
| `object_end_date` | `number` | No |  |
| `object_i_d` | `table` | No |  |
| `object_id` | `number` | No |  |
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
| `tag` | `table` | No |  |
| `title` | `string` | No |  |
| `total` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Object():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Object():load({ id = 1 })
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
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | `table` | No |  |
| `total` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Search():list()
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

