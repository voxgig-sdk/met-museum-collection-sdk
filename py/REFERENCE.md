# MetMuseumCollection Python SDK Reference

Complete API reference for the MetMuseumCollection Python SDK.


## MetMuseumCollectionSDK

### Constructor

```python
from metmuseumcollection_sdk import MetMuseumCollectionSDK

client = MetMuseumCollectionSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MetMuseumCollectionSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MetMuseumCollectionSDK.test()
```


### Instance Methods

#### `Department(data=None)`

Create a new `DepartmentEntity` instance. Pass `None` for no initial data.

#### `Object(data=None)`

Create a new `ObjectEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DepartmentEntity

```python
department = client.Department()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `int` | No |  |
| `displayName` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Department().list()
for department in results:
    print(department)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DepartmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ObjectEntity

```python
object = client.Object()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `GalleryNumber` | `str` | No |  |
| `accessionNumber` | `str` | No |  |
| `accessionYear` | `str` | No |  |
| `additionalImages` | `list` | No |  |
| `artistAlphaSort` | `str` | No |  |
| `artistBeginDate` | `str` | No |  |
| `artistDisplayBio` | `str` | No |  |
| `artistDisplayName` | `str` | No |  |
| `artistEndDate` | `str` | No |  |
| `artistGender` | `str` | No |  |
| `artistNationality` | `str` | No |  |
| `artistPrefix` | `str` | No |  |
| `artistRole` | `str` | No |  |
| `artistSuffix` | `str` | No |  |
| `artistULAN_URL` | `str` | No |  |
| `artistWikidata_URL` | `str` | No |  |
| `city` | `str` | No |  |
| `classification` | `str` | No |  |
| `constituents` | `list` | No |  |
| `country` | `str` | No |  |
| `county` | `str` | No |  |
| `creditLine` | `str` | No |  |
| `culture` | `str` | No |  |
| `department` | `str` | No |  |
| `dimensions` | `str` | No |  |
| `dimensionsParsed` | `list` | No |  |
| `dynasty` | `str` | No |  |
| `excavation` | `str` | No |  |
| `geographyType` | `str` | No |  |
| `isHighlight` | `bool` | No |  |
| `isPublicDomain` | `bool` | No |  |
| `isTimelineWork` | `bool` | No |  |
| `linkResource` | `str` | No |  |
| `locale` | `str` | No |  |
| `locus` | `str` | No |  |
| `measurements` | `list` | No |  |
| `medium` | `str` | No |  |
| `metadataDate` | `str` | No |  |
| `objectBeginDate` | `int` | No |  |
| `objectDate` | `str` | No |  |
| `objectEndDate` | `int` | No |  |
| `objectID` | `int` | No |  |
| `objectIDs` | `list` | No |  |
| `objectName` | `str` | No |  |
| `objectURL` | `str` | No |  |
| `objectWikidata_URL` | `str` | No |  |
| `period` | `str` | No |  |
| `portfolio` | `str` | No |  |
| `primaryImage` | `str` | No |  |
| `primaryImageSmall` | `str` | No |  |
| `region` | `str` | No |  |
| `reign` | `str` | No |  |
| `repository` | `str` | No |  |
| `rightsAndReproduction` | `str` | No |  |
| `river` | `str` | No |  |
| `state` | `str` | No |  |
| `subregion` | `str` | No |  |
| `tags` | `list` | No |  |
| `title` | `str` | No |  |
| `total` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Object().list()
for object in results:
    print(object)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Object().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ObjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `objectIDs` | `list` | No |  |
| `total` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Search().list()
for search in results:
    print(search)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MetMuseumCollectionSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

