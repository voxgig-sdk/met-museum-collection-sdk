# MetMuseumCollection Python SDK



The Python SDK for the MetMuseumCollection API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Department()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/met-museum-collection-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from metmuseumcollection_sdk import MetMuseumCollectionSDK

client = MetMuseumCollectionSDK()
```

### 2. List department records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    departments = client.Department().list()
    for department in departments:
        print(department)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    searchs = client.Search().list()
    print(searchs)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = MetMuseumCollectionSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
search = client.Search().list()
# search contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = MetMuseumCollectionSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### MetMuseumCollectionSDK

```python
from metmuseumcollection_sdk import MetMuseumCollectionSDK

client = MetMuseumCollectionSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = MetMuseumCollectionSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### MetMuseumCollectionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `Object` | `(data) -> ObjectEntity` | Create an Object entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `department = client.Department()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departmentId` | `int` | Unique identifier for the department |
| `displayName` | `str` | Display name of the department |

#### Example: List

```python
departments = client.Department().list()
```


### Object

Create an instance: `object = client.Object()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `GalleryNumber` | `str` | Gallery number, where available |
| `accessionNumber` | `str` | Identifying number for each artwork (not always unique) |
| `accessionYear` | `str` | Year the artwork was acquired |
| `additionalImages` | `list` | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `str` | Used to sort artist names alphabetically |
| `artistBeginDate` | `str` | Year the artist was born |
| `artistDisplayBio` | `str` | Nationality and life dates of an artist |
| `artistDisplayName` | `str` | Artist name in the correct order for display |
| `artistEndDate` | `str` | Year the artist died |
| `artistGender` | `str` | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `str` | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `str` | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `str` | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `str` | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `str` | ULAN URL for the artist |
| `artistWikidata_URL` | `str` | Wikidata URL for the artist |
| `city` | `str` | City where the artwork was created |
| `classification` | `str` | General term describing the artwork type |
| `constituents` | `list` | An array containing the constituents associated with an object |
| `country` | `str` | Country where the artwork was created or found |
| `county` | `str` | County where the artwork was created |
| `creditLine` | `str` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `str` | Information about the culture, or people from which an object was created |
| `department` | `str` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `str` | Size of the artwork or object |
| `dimensionsParsed` | `list` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `str` | Dynasty under which an object was created |
| `excavation` | `str` | The name of an excavation |
| `geographyType` | `str` | Qualifying information that describes the relationship of the place catalogued to the object |
| `isHighlight` | `bool` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `bool` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `bool` | Whether the object is on the Timeline of Art History website |
| `linkResource` | `str` | URL to object's page on metmuseum.org |
| `locale` | `str` | Geographic location more specific than subregion |
| `locus` | `str` | Geographic location that is less specific than locale |
| `measurements` | `list` | Array of elements with measurements. |
| `medium` | `str` | Refers to the materials that were used to create the artwork |
| `metadataDate` | `str` | Date metadata was last updated |
| `objectBeginDate` | `int` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `str` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `int` | Machine readable date indicating the year the artwork was completed |
| `objectID` | `int` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `list` | An array containing the object ID of publicly-available objects |
| `objectName` | `str` | Describes the physical type of the object |
| `objectURL` | `str` | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `str` | Wikidata URL for the object |
| `period` | `str` | Time or time period when an object was created |
| `portfolio` | `str` | A set of works created as a group or published as a series |
| `primaryImage` | `str` | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `str` | URL to the lower-res primary image of an object in JPEG format |
| `region` | `str` | Geographic location more specific than country |
| `reign` | `str` | Reign of a monarch or ruler under which an object was created |
| `repository` | `str` | Repository information |
| `rightsAndReproduction` | `str` | Credit line for artworks still under copyright |
| `river` | `str` | River related to the origins of an artwork |
| `state` | `str` | State or province where the artwork was created |
| `subregion` | `str` | Geographic location more specific than Region |
| `tags` | `list` | An array of subject keyword tags associated with the object |
| `title` | `str` | Title, identifying phrase, or name given to a work of art |
| `total` | `int` | The total number of publicly-available objects |

#### Example: Load

```python
object = client.Object().load({"id": 1})
```

#### Example: List

```python
objects = client.Object().list()
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `objectIDs` | `list` | An array containing the object IDs of matching objects |
| `total` | `int` | The total number of objects matching the search query |

#### Example: List

```python
searchs = client.Search().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── metmuseumcollection_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`metmuseumcollection_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
search = client.Search()
search.list()

# search.data_get() now returns the search data from the last list
# search.match_get() returns the last match criteria
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
