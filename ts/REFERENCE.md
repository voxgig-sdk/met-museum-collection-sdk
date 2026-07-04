# MetMuseumCollection TypeScript SDK Reference

Complete API reference for the MetMuseumCollection TypeScript SDK.


## MetMuseumCollectionSDK

### Constructor

```ts
new MetMuseumCollectionSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MetMuseumCollectionSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = MetMuseumCollectionSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `MetMuseumCollectionSDK` instance in test mode.


### Instance Methods

#### `Department(data?: object)`

Create a new `Department` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DepartmentEntity` instance.

#### `Object(data?: object)`

Create a new `Object` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ObjectEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `MetMuseumCollectionSDK.test()`.

**Returns:** `MetMuseumCollectionSDK` instance in test mode.


---

## DepartmentEntity

```ts
const department = client.department
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `department_id` | ``$INTEGER`` | No |  |
| `display_name` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.department.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DepartmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `MetMuseumCollectionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ObjectEntity

```ts
const object = client.object
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.object.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.object.load({ id: 'object_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ObjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `MetMuseumCollectionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object_i_d` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.search.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `MetMuseumCollectionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new MetMuseumCollectionSDK({
  feature: {
    test: { active: true },
  }
})
```

