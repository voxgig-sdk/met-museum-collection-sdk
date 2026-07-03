# MetMuseumCollection Lua SDK



The Lua SDK for the MetMuseumCollection API — an entity-oriented client using Lua conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
luarocks install voxgig-sdk-met-museum-collection
```

If the module is not yet published, add the source directory to
your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("met-museum-collection_sdk")

local client = sdk.new({
  apikey = os.getenv("MET-MUSEUM-COLLECTION_APIKEY"),
})
```

### 2. List departments

```lua
local result, err = client:Department():list()
if err then error(err) end

if type(result) == "table" then
  for _, item in ipairs(result) do
    local d = item:data_get()
    print(d["id"], d["name"])
  end
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:MetMuseumCollection():load({ id = "test01" })
-- result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MET-MUSEUM-COLLECTION_TEST_LIVE=TRUE
MET-MUSEUM-COLLECTION_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### MetMuseumCollectionSDK

```lua
local sdk = require("met-museum-collection_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MetMuseumCollectionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `Object` | `(data) -> ObjectEntity` | Create a Object entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

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

Create an instance: `const department = client.Department()`

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

```ts
const departments = await client.Department().list()
```


### Object

Create an instance: `const object = client.Object()`

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

```ts
const object = await client.Object().load({ id: 'object_id' })
```

#### Example: List

```ts
const objects = await client.Object().list()
```


### Search

Create an instance: `const search = client.Search()`

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

```ts
const searchs = await client.Search().list()
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── met-museum-collection_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`met-museum-collection_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local moon = client:Moon(nil)
moon:load({ planet_id = "earth", id = "luna" }, nil)

-- moon:data_get() now returns the loaded moon data
-- moon:match_get() returns the last match criteria
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
