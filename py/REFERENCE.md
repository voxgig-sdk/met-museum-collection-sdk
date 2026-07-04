# MetMuseumCollection Python SDK Reference

Complete API reference for the MetMuseumCollection Python SDK.


## MetMuseumCollectionSDK

### Constructor

```python
from met-museum-collection_sdk import MetMuseumCollectionSDK

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
department = client.department
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `display_name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.department.list({})
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
object = client.object
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.object.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.object.load({"id": "object_id"})
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
search = client.search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.search.list({})
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

