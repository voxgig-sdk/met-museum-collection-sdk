# MetMuseumCollection Ruby SDK Reference

Complete API reference for the MetMuseumCollection Ruby SDK.


## MetMuseumCollectionSDK

### Constructor

```ruby
require_relative 'MetMuseumCollection_sdk'

client = MetMuseumCollectionSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MetMuseumCollectionSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = MetMuseumCollectionSDK.test
```


### Instance Methods

#### `Department(data = nil)`

Create a new `Department` entity instance. Pass `nil` for no initial data.

#### `Object(data = nil)`

Create a new `Object` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DepartmentEntity

```ruby
department = client.Department
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `Integer` | No | Unique identifier for the department |
| `displayName` | `String` | No | Display name of the department |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Department.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ObjectEntity

```ruby
object = client.Object
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `GalleryNumber` | `String` | No | Gallery number, where available |
| `accessionNumber` | `String` | No | Identifying number for each artwork (not always unique) |
| `accessionYear` | `String` | No | Year the artwork was acquired |
| `additionalImages` | `Array` | No | An array containing URLs to the additional images of an object in JPEG format |
| `artistAlphaSort` | `String` | No | Used to sort artist names alphabetically |
| `artistBeginDate` | `String` | No | Year the artist was born |
| `artistDisplayBio` | `String` | No | Nationality and life dates of an artist |
| `artistDisplayName` | `String` | No | Artist name in the correct order for display |
| `artistEndDate` | `String` | No | Year the artist died |
| `artistGender` | `String` | No | Gender of the artist (currently contains female designations only) |
| `artistNationality` | `String` | No | National, geopolitical, cultural, or ethnic origins or affiliation of the creator |
| `artistPrefix` | `String` | No | Describes the extent of creation or describes an attribution qualifier |
| `artistRole` | `String` | No | Role of the artist related to the type of artwork or object that was created |
| `artistSuffix` | `String` | No | Used to record complex information that qualifies the role of a constituent |
| `artistULAN_URL` | `String` | No | ULAN URL for the artist |
| `artistWikidata_URL` | `String` | No | Wikidata URL for the artist |
| `city` | `String` | No | City where the artwork was created |
| `classification` | `String` | No | General term describing the artwork type |
| `constituents` | `Array` | No | An array containing the constituents associated with an object |
| `country` | `String` | No | Country where the artwork was created or found |
| `county` | `String` | No | County where the artwork was created |
| `creditLine` | `String` | No | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `String` | No | Information about the culture, or people from which an object was created |
| `department` | `String` | No | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `String` | No | Size of the artwork or object |
| `dimensionsParsed` | `Array` | No | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `String` | No | Dynasty under which an object was created |
| `excavation` | `String` | No | The name of an excavation |
| `geographyType` | `String` | No | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `String` | No |  |
| `isHighlight` | `Boolean` | No | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `Boolean` | No | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `Boolean` | No | Whether the object is on the Timeline of Art History website |
| `linkResource` | `String` | No | URL to object's page on metmuseum.org |
| `locale` | `String` | No | Geographic location more specific than subregion |
| `locus` | `String` | No | Geographic location that is less specific than locale |
| `measurements` | `Array` | No | Array of elements with measurements. |
| `medium` | `String` | No | Refers to the materials that were used to create the artwork |
| `metadataDate` | `String` | No | Date metadata was last updated |
| `objectBeginDate` | `Integer` | No | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `String` | No | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `Integer` | No | Machine readable date indicating the year the artwork was completed |
| `objectID` | `Integer` | No | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `Array` | No | An array containing the object ID of publicly-available objects |
| `objectName` | `String` | No | Describes the physical type of the object |
| `objectURL` | `String` | No | URL to object's page on metmuseum.org |
| `objectWikidata_URL` | `String` | No | Wikidata URL for the object |
| `period` | `String` | No | Time or time period when an object was created |
| `portfolio` | `String` | No | A set of works created as a group or published as a series |
| `primaryImage` | `String` | No | URL to the primary image of an object in JPEG format |
| `primaryImageSmall` | `String` | No | URL to the lower-res primary image of an object in JPEG format |
| `region` | `String` | No | Geographic location more specific than country |
| `reign` | `String` | No | Reign of a monarch or ruler under which an object was created |
| `repository` | `String` | No | Repository information |
| `rightsAndReproduction` | `String` | No | Credit line for artworks still under copyright |
| `river` | `String` | No | River related to the origins of an artwork |
| `state` | `String` | No | State or province where the artwork was created |
| `subregion` | `String` | No | Geographic location more specific than Region |
| `tags` | `Array` | No | An array of subject keyword tags associated with the object |
| `title` | `String` | No | Title, identifying phrase, or name given to a work of art |
| `total` | `Integer` | No | The total number of publicly-available objects |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Object.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Object.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ObjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `objectIDs` | `Array` | No | An array containing the object IDs of matching objects |
| `total` | `Integer` | No | The total number of objects matching the search query |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Search.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = MetMuseumCollectionSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

