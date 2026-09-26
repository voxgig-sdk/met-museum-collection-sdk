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
| `departmentId` | `int` | No | Unique identifier for the department |
| `displayName` | `str` | No | Display name of the department |

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
| `GalleryNumber` | `str` | No | Gallery number, where available |
| `accessionNumber` | `str` | No | Identifying number for each artwork (not always unique) |
| `accessionYear` | `str` | No | Year the artwork was acquired |
| `additionalImages` | `list` | No | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `str` | No | Used to sort artist names alphabetically |
| `artistBeginDate` | `str` | No | Year the artist was born |
| `artistDisplayBio` | `str` | No | Nationality and life dates of an artist |
| `artistDisplayName` | `str` | No | Artist name in the correct order for display |
| `artistEndDate` | `str` | No | Year the artist died |
| `artistGender` | `str` | No | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `str` | No | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `str` | No | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `str` | No | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `str` | No | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `str` | No | ULAN URL for the artist |
| `artistWikidata_URL` | `str` | No | Wikidata URL for the artist |
| `city` | `str` | No | City where the artwork was created |
| `classification` | `str` | No | General term describing the artwork type |
| `constituents` | `list` | No | An array containing the constituents associated with an object |
| `country` | `str` | No | Country where the artwork was created or found |
| `county` | `str` | No | County where the artwork was created |
| `creditLine` | `str` | No | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `str` | No | Information about the culture, or people from which an object was created |
| `department` | `str` | No | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `str` | No | Size of the artwork or object |
| `dimensionsParsed` | `list` | No | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `str` | No | Dynasty under which an object was created |
| `excavation` | `str` | No | The name of an excavation |
| `geographyType` | `str` | No | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `str` | No |  |
| `isHighlight` | `bool` | No | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `bool` | No | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `bool` | No | Whether the object is on the Timeline of Art History website |
| `linkResource` | `str` | No | URL to object's page on metmuseum.org |
| `locale` | `str` | No | Geographic location more specific than subregion |
| `locus` | `str` | No | Geographic location that is less specific than locale |
| `measurements` | `list` | No | Array of elements with measurements. |
| `medium` | `str` | No | Refers to the materials that were used to create the artwork |
| `metadataDate` | `str` | No | Date metadata was last updated |
| `objectBeginDate` | `int` | No | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `str` | No | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `int` | No | Machine readable date indicating the year the artwork was completed |
| `objectID` | `int` | No | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `list` | No | An array containing the object ID of publicly-available objects |
| `objectName` | `str` | No | Describes the physical type of the object |
| `objectURL` | `str` | No | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `str` | No | Wikidata URL for the object |
| `period` | `str` | No | Time or time period when an object was created |
| `portfolio` | `str` | No | A set of works created as a group or published as a series |
| `primaryImage` | `str` | No | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `str` | No | URL to the lower-res primary image of an object in JPEG format |
| `region` | `str` | No | Geographic location more specific than country |
| `reign` | `str` | No | Reign of a monarch or ruler under which an object was created |
| `repository` | `str` | No | Repository information |
| `rightsAndReproduction` | `str` | No | Credit line for artworks still under copyright |
| `river` | `str` | No | River related to the origins of an artwork |
| `state` | `str` | No | State or province where the artwork was created |
| `subregion` | `str` | No | Geographic location more specific than Region |
| `tags` | `list` | No | An array of subject keyword tags associated with the object |
| `title` | `str` | No | Title, identifying phrase, or name given to a work of art |
| `total` | `int` | No | The total number of publicly-available objects |

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
| `objectIDs` | `list` | No | An array containing the object IDs of matching objects |
| `total` | `int` | No | The total number of objects matching the search query |

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
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = MetMuseumCollectionSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

