# MetMuseumCollection Ruby SDK



The Ruby SDK for the MetMuseumCollection API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Department` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/met-museum-collection-sdk/releases](https://github.com/voxgig-sdk/met-museum-collection-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "MetMuseumCollection_sdk"

client = MetMuseumCollectionSDK.new
```

### 2. List department records

```ruby
begin
  # list returns an Array of Department records — iterate directly.
  departments = client.Department.list
  departments.each do |item|
    puts "#{item["departmentId"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  searchs = client.Search.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = MetMuseumCollectionSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
search = client.Search.list()
puts search
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = MetMuseumCollectionSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### MetMuseumCollectionSDK

```ruby
require_relative "MetMuseumCollection_sdk"
client = MetMuseumCollectionSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = MetMuseumCollectionSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MetMuseumCollectionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `Object` | `(data) -> ObjectEntity` | Create an Object entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `MetMuseumCollectionError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `department = client.Department`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `Integer` | Unique identifier for the department |
| `displayName` | `String` | Display name of the department |

#### Example: List

```ruby
# list returns an Array of Department records (raises on error).
departments = client.Department.list
```


### Object

Create an instance: `object = client.Object`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `GalleryNumber` | `String` | Gallery number, where available |
| `accessionNumber` | `String` | Identifying number for each artwork (not always unique) |
| `accessionYear` | `String` | Year the artwork was acquired |
| `additionalImages` | `Array` | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `String` | Used to sort artist names alphabetically |
| `artistBeginDate` | `String` | Year the artist was born |
| `artistDisplayBio` | `String` | Nationality and life dates of an artist |
| `artistDisplayName` | `String` | Artist name in the correct order for display |
| `artistEndDate` | `String` | Year the artist died |
| `artistGender` | `String` | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `String` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `String` | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `String` | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `String` | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `String` | ULAN URL for the artist |
| `artistWikidata_URL` | `String` | Wikidata URL for the artist |
| `city` | `String` | City where the artwork was created |
| `classification` | `String` | General term describing the artwork type |
| `constituents` | `Array` | An array containing the constituents associated with an object |
| `country` | `String` | Country where the artwork was created or found |
| `county` | `String` | County where the artwork was created |
| `creditLine` | `String` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `String` | Information about the culture, or people from which an object was created |
| `department` | `String` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `String` | Size of the artwork or object |
| `dimensionsParsed` | `Array` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `String` | Dynasty under which an object was created |
| `excavation` | `String` | The name of an excavation |
| `geographyType` | `String` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `String` |  |
| `isHighlight` | `Boolean` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `Boolean` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `Boolean` | Whether the object is on the Timeline of Art History website |
| `linkResource` | `String` | URL to object's page on metmuseum.org |
| `locale` | `String` | Geographic location more specific than subregion |
| `locus` | `String` | Geographic location that is less specific than locale |
| `measurements` | `Array` | Array of elements with measurements. |
| `medium` | `String` | Refers to the materials that were used to create the artwork |
| `metadataDate` | `String` | Date metadata was last updated |
| `objectBeginDate` | `Integer` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `String` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `Integer` | Machine readable date indicating the year the artwork was completed |
| `objectID` | `Integer` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `Array` | An array containing the object ID of publicly-available objects |
| `objectName` | `String` | Describes the physical type of the object |
| `objectURL` | `String` | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `String` | Wikidata URL for the object |
| `period` | `String` | Time or time period when an object was created |
| `portfolio` | `String` | A set of works created as a group or published as a series |
| `primaryImage` | `String` | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `String` | URL to the lower-res primary image of an object in JPEG format |
| `region` | `String` | Geographic location more specific than country |
| `reign` | `String` | Reign of a monarch or ruler under which an object was created |
| `repository` | `String` | Repository information |
| `rightsAndReproduction` | `String` | Credit line for artworks still under copyright |
| `river` | `String` | River related to the origins of an artwork |
| `state` | `String` | State or province where the artwork was created |
| `subregion` | `String` | Geographic location more specific than Region |
| `tags` | `Array` | An array of subject keyword tags associated with the object |
| `title` | `String` | Title, identifying phrase, or name given to a work of art |
| `total` | `Integer` | The total number of publicly-available objects |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Object record (raises on error).
object = client.Object.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Object records (raises on error).
objects = client.Object.list
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `objectIDs` | `Array` | An array containing the object IDs of matching objects |
| `total` | `Integer` | The total number of objects matching the search query |

#### Example: List

```ruby
# list returns an Array of Search records (raises on error).
searchs = client.Search.list
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── MetMuseumCollection_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`MetMuseumCollection_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
search = client.Search
search.list()

# search.data_get now returns the search data from the last list
# search.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
