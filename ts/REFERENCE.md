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
const department = client.Department()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentId` | `number` | No |  |
| `displayName` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Department().list()
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
const object = client.Object()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `GalleryNumber` | `string` | No |  |
| `accessionNumber` | `string` | No |  |
| `accessionYear` | `string` | No |  |
| `additionalImages` | `any[]` | No |  |
| `artistAlphaSort` | `string` | No |  |
| `artistBeginDate` | `string` | No |  |
| `artistDisplayBio` | `string` | No |  |
| `artistDisplayName` | `string` | No |  |
| `artistEndDate` | `string` | No |  |
| `artistGender` | `string` | No |  |
| `artistNationality` | `string` | No |  |
| `artistPrefix` | `string` | No |  |
| `artistRole` | `string` | No |  |
| `artistSuffix` | `string` | No |  |
| `artistULAN_URL` | `string` | No |  |
| `artistWikidata_URL` | `string` | No |  |
| `city` | `string` | No |  |
| `classification` | `string` | No |  |
| `constituents` | `any[]` | No |  |
| `country` | `string` | No |  |
| `county` | `string` | No |  |
| `creditLine` | `string` | No |  |
| `culture` | `string` | No |  |
| `department` | `string` | No |  |
| `dimensions` | `string` | No |  |
| `dimensionsParsed` | `any[]` | No |  |
| `dynasty` | `string` | No |  |
| `excavation` | `string` | No |  |
| `geographyType` | `string` | No |  |
| `isHighlight` | `boolean` | No |  |
| `isPublicDomain` | `boolean` | No |  |
| `isTimelineWork` | `boolean` | No |  |
| `linkResource` | `string` | No |  |
| `locale` | `string` | No |  |
| `locus` | `string` | No |  |
| `measurements` | `any[]` | No |  |
| `medium` | `string` | No |  |
| `metadataDate` | `string` | No |  |
| `objectBeginDate` | `number` | No |  |
| `objectDate` | `string` | No |  |
| `objectEndDate` | `number` | No |  |
| `objectID` | `number` | No |  |
| `objectIDs` | `any[]` | No |  |
| `objectName` | `string` | No |  |
| `objectURL` | `string` | No |  |
| `objectWikidata_URL` | `string` | No |  |
| `period` | `string` | No |  |
| `portfolio` | `string` | No |  |
| `primaryImage` | `string` | No |  |
| `primaryImageSmall` | `string` | No |  |
| `region` | `string` | No |  |
| `reign` | `string` | No |  |
| `repository` | `string` | No |  |
| `rightsAndReproduction` | `string` | No |  |
| `river` | `string` | No |  |
| `state` | `string` | No |  |
| `subregion` | `string` | No |  |
| `tags` | `any[]` | No |  |
| `title` | `string` | No |  |
| `total` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Object().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Object().load({ id: 1 })
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
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `objectIDs` | `any[]` | No |  |
| `total` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Search().list()
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

