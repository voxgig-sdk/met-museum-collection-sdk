# MetMuseumCollection Python SDK

The Python SDK for the MetMuseumCollection API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install met-museum-collection-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from metmuseumcollection_sdk import MetMuseumCollectionSDK

client = MetMuseumCollectionSDK({})
```

### 2. List departments

```python
result, err = client.Department(None).list(None, None)
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = MetMuseumCollectionSDK.test(None, None)

result, err = client.MetMuseumCollection(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
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
MET-MUSEUM-COLLECTION_TEST_LIVE=TRUE
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
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Department` | `(data) -> DepartmentEntity` | Create a Department entity instance. |
| `Object` | `(data) -> ObjectEntity` | Create a Object entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

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
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
