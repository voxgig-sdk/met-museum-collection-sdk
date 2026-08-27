# MetMuseumCollection Lua SDK



The Lua SDK for the MetMuseumCollection API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Department()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/met-museum-collection-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("met-museum-collection_sdk")

local client = sdk.new()
```

### 2. List department records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local departments, err = client:Department():list()
if err then error(err) end

for _, item in ipairs(departments) do
  print(item["displayName"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local searchs, err = client:Search():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
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

local result, err = client:Search():list()
-- result is the returned data; err is set on failure
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
MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE
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
| `Object` | `(data) -> ObjectEntity` | Create an Object entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local object, err = client:Object():load({ id = "example_id" })
    if err then error(err) end
    -- object is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Department

| Field | Description |
| --- | --- |
| `departmentId` | Unique identifier for the department |
| `displayName` | Display name of the department |

Operations: List.

API path: `/departments`

#### Object

| Field | Description |
| --- | --- |
| `GalleryNumber` | Gallery number, where available |
| `accessionNumber` | Identifying number for each artwork (not always unique) |
| `accessionYear` | Year the artwork was acquired |
| `additionalImages` | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | Used to sort artist names alphabetically |
| `artistBeginDate` | Year the artist was born |
| `artistDisplayBio` | Nationality and life dates of an artist |
| `artistDisplayName` | Artist name in the correct order for display |
| `artistEndDate` | Year the artist died |
| `artistGender` | Gender of the artist (currently contains female designations only) |
| `artistNationality` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | ULAN URL for the artist |
| `artistWikidata_URL` | Wikidata URL for the artist |
| `city` | City where the artwork was created |
| `classification` | General term describing the artwork type |
| `constituents` | An array containing the constituents associated with an object |
| `country` | Country where the artwork was created or found |
| `county` | County where the artwork was created |
| `creditLine` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | Information about the culture, or people from which an object was created |
| `department` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | Size of the artwork or object |
| `dimensionsParsed` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | Dynasty under which an object was created |
| `excavation` | The name of an excavation |
| `geographyType` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` |  |
| `isHighlight` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | Whether the object is on the Timeline of Art History website |
| `linkResource` | URL to object's page on metmuseum.org |
| `locale` | Geographic location more specific than subregion |
| `locus` | Geographic location that is less specific than locale |
| `measurements` | Array of elements with measurements. |
| `medium` | Refers to the materials that were used to create the artwork |
| `metadataDate` | Date metadata was last updated |
| `objectBeginDate` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | Machine readable date indicating the year the artwork was completed |
| `objectID` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | An array containing the object ID of publicly-available objects |
| `objectName` | Describes the physical type of the object |
| `objectURL` | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | Wikidata URL for the object |
| `period` | Time or time period when an object was created |
| `portfolio` | A set of works created as a group or published as a series |
| `primaryImage` | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | URL to the lower-res primary image of an object in JPEG format |
| `region` | Geographic location more specific than country |
| `reign` | Reign of a monarch or ruler under which an object was created |
| `repository` | Repository information |
| `rightsAndReproduction` | Credit line for artworks still under copyright |
| `river` | River related to the origins of an artwork |
| `state` | State or province where the artwork was created |
| `subregion` | Geographic location more specific than Region |
| `tags` | An array of subject keyword tags associated with the object |
| `title` | Title, identifying phrase, or name given to a work of art |
| `total` | The total number of publicly-available objects |

Operations: List, Load.

API path: `/objects`

#### Search

| Field | Description |
| --- | --- |
| `objectIDs` | An array containing the object IDs of matching objects |
| `total` | The total number of objects matching the search query |

Operations: List.

API path: `/search`



## Entities


### Department

Create an instance: `local department = client:Department(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `number` | Unique identifier for the department |
| `displayName` | `string` | Display name of the department |

#### Example: List

```lua
local departments, err = client:Department():list()
```


### Object

Create an instance: `local object = client:Object(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `GalleryNumber` | `string` | Gallery number, where available |
| `accessionNumber` | `string` | Identifying number for each artwork (not always unique) |
| `accessionYear` | `string` | Year the artwork was acquired |
| `additionalImages` | `table` | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `string` | Used to sort artist names alphabetically |
| `artistBeginDate` | `string` | Year the artist was born |
| `artistDisplayBio` | `string` | Nationality and life dates of an artist |
| `artistDisplayName` | `string` | Artist name in the correct order for display |
| `artistEndDate` | `string` | Year the artist died |
| `artistGender` | `string` | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `string` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `string` | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `string` | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `string` | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `string` | ULAN URL for the artist |
| `artistWikidata_URL` | `string` | Wikidata URL for the artist |
| `city` | `string` | City where the artwork was created |
| `classification` | `string` | General term describing the artwork type |
| `constituents` | `table` | An array containing the constituents associated with an object |
| `country` | `string` | Country where the artwork was created or found |
| `county` | `string` | County where the artwork was created |
| `creditLine` | `string` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `string` | Information about the culture, or people from which an object was created |
| `department` | `string` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `string` | Size of the artwork or object |
| `dimensionsParsed` | `table` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `string` | Dynasty under which an object was created |
| `excavation` | `string` | The name of an excavation |
| `geographyType` | `string` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `string` |  |
| `isHighlight` | `boolean` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `boolean` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `boolean` | Whether the object is on the Timeline of Art History website |
| `linkResource` | `string` | URL to object's page on metmuseum.org |
| `locale` | `string` | Geographic location more specific than subregion |
| `locus` | `string` | Geographic location that is less specific than locale |
| `measurements` | `table` | Array of elements with measurements. |
| `medium` | `string` | Refers to the materials that were used to create the artwork |
| `metadataDate` | `string` | Date metadata was last updated |
| `objectBeginDate` | `number` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `string` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `number` | Machine readable date indicating the year the artwork was completed |
| `objectID` | `number` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `table` | An array containing the object ID of publicly-available objects |
| `objectName` | `string` | Describes the physical type of the object |
| `objectURL` | `string` | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `string` | Wikidata URL for the object |
| `period` | `string` | Time or time period when an object was created |
| `portfolio` | `string` | A set of works created as a group or published as a series |
| `primaryImage` | `string` | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `string` | URL to the lower-res primary image of an object in JPEG format |
| `region` | `string` | Geographic location more specific than country |
| `reign` | `string` | Reign of a monarch or ruler under which an object was created |
| `repository` | `string` | Repository information |
| `rightsAndReproduction` | `string` | Credit line for artworks still under copyright |
| `river` | `string` | River related to the origins of an artwork |
| `state` | `string` | State or province where the artwork was created |
| `subregion` | `string` | Geographic location more specific than Region |
| `tags` | `table` | An array of subject keyword tags associated with the object |
| `title` | `string` | Title, identifying phrase, or name given to a work of art |
| `total` | `number` | The total number of publicly-available objects |

#### Example: Load

```lua
local object, err = client:Object():load({ id = 1 })
```

#### Example: List

```lua
local objects, err = client:Object():list()
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `objectIDs` | `table` | An array containing the object IDs of matching objects |
| `total` | `number` | The total number of objects matching the search query |

#### Example: List

```lua
local searchs, err = client:Search():list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local search = client:Search()
search:list()

-- search:data_get() now returns the search data from the last list
-- search:match_get() returns the last match criteria
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
