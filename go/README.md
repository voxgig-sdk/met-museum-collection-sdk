# MetMuseumCollection Golang SDK



The Golang SDK for the MetMuseumCollection API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Department(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/met-museum-collection-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/met-museum-collection-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/met-museum-collection-sdk/go=../met-museum-collection-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/met-museum-collection-sdk/go"
)

func main() {
    client := sdk.New()

    // List department records — the value is the array of records itself.
    departments, err := client.Department(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range departments.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
searchs, err := client.Search(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = searchs
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

search, err := client.Search(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(search) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewMetMuseumCollectionSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewMetMuseumCollectionSDK

```go
func NewMetMuseumCollectionSDK(options map[string]any) *MetMuseumCollectionSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *MetMuseumCollectionSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MetMuseumCollectionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Department` | `(data map[string]any) MetMuseumCollectionEntity` | Create a Department entity instance. |
| `Object` | `(data map[string]any) MetMuseumCollectionEntity` | Create an Object entity instance. |
| `Search` | `(data map[string]any) MetMuseumCollectionEntity` | Create a Search entity instance. |

### Entity interface (MetMuseumCollectionEntity)

All entities implement the `MetMuseumCollectionEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    department, err := client.Department(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // department is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Department

| Field | Description |
| --- | --- |
| `"departmentId"` | Unique identifier for the department |
| `"displayName"` | Display name of the department |

Operations: List.

API path: `/departments`

#### Object

| Field | Description |
| --- | --- |
| `"GalleryNumber"` | Gallery number, where available |
| `"accessionNumber"` | Identifying number for each artwork (not always unique) |
| `"accessionYear"` | Year the artwork was acquired |
| `"additionalImages"` | An array containing URLs to the additional images of an object in JPEG format |
| `"artistAlphaSort"` | Used to sort artist names alphabetically |
| `"artistBeginDate"` | Year the artist was born |
| `"artistDisplayBio"` | Nationality and life dates of an artist |
| `"artistDisplayName"` | Artist name in the correct order for display |
| `"artistEndDate"` | Year the artist died |
| `"artistGender"` | Gender of the artist (currently contains female designations only) |
| `"artistNationality"` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `"artistPrefix"` | Describes the extent of creation or describes an attribution qualifier |
| `"artistRole"` | Role of the artist related to the type of artwork or object that was created |
| `"artistSuffix"` | Used to record complex information that qualifies the role of a constituent |
| `"artistULAN_URL"` | ULAN URL for the artist |
| `"artistWikidata_URL"` | Wikidata URL for the artist |
| `"city"` | City where the artwork was created |
| `"classification"` | General term describing the artwork type |
| `"constituents"` | An array containing the constituents associated with an object |
| `"country"` | Country where the artwork was created or found |
| `"county"` | County where the artwork was created |
| `"creditLine"` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `"culture"` | Information about the culture, or people from which an object was created |
| `"department"` | Indicates The Met's curatorial department responsible for the artwork |
| `"dimensions"` | Size of the artwork or object |
| `"dimensionsParsed"` | Size of the artwork or object in centimeters, parsed |
| `"dynasty"` | Dynasty under which an object was created |
| `"excavation"` | The name of an excavation |
| `"geographyType"` | Qualifying information that describes the relationship of the place catalogued to the object |
| `"id"` |  |
| `"isHighlight"` | When true indicates a popular and important artwork in the collection |
| `"isPublicDomain"` | When true indicates an artwork in the Public Domain |
| `"isTimelineWork"` | Whether the object is on the Timeline of Art History website |
| `"linkResource"` | URL to object's page on metmuseum.org |
| `"locale"` | Geographic location more specific than subregion |
| `"locus"` | Geographic location that is less specific than locale |
| `"measurements"` | Array of elements with measurements. |
| `"medium"` | Refers to the materials that were used to create the artwork |
| `"metadataDate"` | Date metadata was last updated |
| `"objectBeginDate"` | Machine readable date indicating the year the artwork was started to be created |
| `"objectDate"` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `"objectEndDate"` | Machine readable date indicating the year the artwork was completed |
| `"objectID"` | Identifying number for each artwork (unique, can be used as key field) |
| `"objectIDs"` | An array containing the object ID of publicly-available objects |
| `"objectName"` | Describes the physical type of the object |
| `"objectURL"` | URL to object's page on metmuseum.org |
| `"objectWikidata_URL"` | Wikidata URL for the object |
| `"period"` | Time or time period when an object was created |
| `"portfolio"` | A set of works created as a group or published as a series |
| `"primaryImage"` | URL to the primary image of an object in JPEG format |
| `"primaryImageSmall"` | URL to the lower-res primary image of an object in JPEG format |
| `"region"` | Geographic location more specific than country |
| `"reign"` | Reign of a monarch or ruler under which an object was created |
| `"repository"` | Repository information |
| `"rightsAndReproduction"` | Credit line for artworks still under copyright |
| `"river"` | River related to the origins of an artwork |
| `"state"` | State or province where the artwork was created |
| `"subregion"` | Geographic location more specific than Region |
| `"tags"` | An array of subject keyword tags associated with the object |
| `"title"` | Title, identifying phrase, or name given to a work of art |
| `"total"` | The total number of publicly-available objects |

Operations: List, Load.

API path: `/objects`

#### Search

| Field | Description |
| --- | --- |
| `"objectIDs"` | An array containing the object IDs of matching objects |
| `"total"` | The total number of objects matching the search query |

Operations: List.

API path: `/search`



## Entities


### Department

Create an instance: `department := client.Department(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Unique identifier for the department |
| `displayName` | `string` | Display name of the department |

#### Example: List

```go
departments, err := client.Department(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(departments) // the array of records
```


### Object

Create an instance: `object := client.Object(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `GalleryNumber` | `string` | Gallery number, where available |
| `accessionNumber` | `string` | Identifying number for each artwork (not always unique) |
| `accessionYear` | `string` | Year the artwork was acquired |
| `additionalImages` | `[]any` | An array containing URLs to the additional images of an object in JPEG format |
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
| `constituents` | `[]any` | An array containing the constituents associated with an object |
| `country` | `string` | Country where the artwork was created or found |
| `county` | `string` | County where the artwork was created |
| `creditLine` | `string` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `string` | Information about the culture, or people from which an object was created |
| `department` | `string` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `string` | Size of the artwork or object |
| `dimensionsParsed` | `[]any` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `string` | Dynasty under which an object was created |
| `excavation` | `string` | The name of an excavation |
| `geographyType` | `string` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `string` |  |
| `isHighlight` | `bool` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `bool` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `bool` | Whether the object is on the Timeline of Art History website |
| `linkResource` | `string` | URL to object's page on metmuseum.org |
| `locale` | `string` | Geographic location more specific than subregion |
| `locus` | `string` | Geographic location that is less specific than locale |
| `measurements` | `[]any` | Array of elements with measurements. |
| `medium` | `string` | Refers to the materials that were used to create the artwork |
| `metadataDate` | `string` | Date metadata was last updated |
| `objectBeginDate` | `int` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `string` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `int` | Machine readable date indicating the year the artwork was completed |
| `objectID` | `int` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `[]any` | An array containing the object ID of publicly-available objects |
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
| `tags` | `[]any` | An array of subject keyword tags associated with the object |
| `title` | `string` | Title, identifying phrase, or name given to a work of art |
| `total` | `int` | The total number of publicly-available objects |

#### Example: Load

```go
object, err := client.Object(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(object) // the loaded record
```

#### Example: List

```go
objects, err := client.Object(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(objects) // the array of records
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `objectIDs` | `[]any` | An array containing the object IDs of matching objects |
| `total` | `int` | The total number of objects matching the search query |

#### Example: List

```go
searchs, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(searchs) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/met-museum-collection-sdk/go/
├── met-museum-collection.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/met-museum-collection-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
search := client.Search(nil)
search.List(nil, nil)

// search.Data() now returns the search data from the last list
// search.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
