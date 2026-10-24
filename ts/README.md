# MetMuseumCollection TypeScript SDK



The TypeScript SDK for the MetMuseumCollection API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Department()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/met-museum-collection-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/met-museum-collection-sdk
npm install ./met-museum-collection-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { MetMuseumCollectionSDK } from '@voxgig-sdk/met-museum-collection-sdk'

const client = new MetMuseumCollectionSDK()
```

### 2. List department records

`list()` resolves to an array of Department ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const departments = await client.Department().list()

for (const department of departments) {
  console.log(department.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const searchs = await client.Search().list()
  console.log(searchs.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = MetMuseumCollectionSDK.test()

const searchs = await client.Search().list()
// searchs is an array of Search entities, one per mock record
console.log(searchs.map((search) => search.data()))
```

You can also use the instance method:

```ts
const client = new MetMuseumCollectionSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Search()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new MetMuseumCollectionSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### MetMuseumCollectionSDK

#### Constructor

```ts
new MetMuseumCollectionSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Department(data?)` | `DepartmentEntity` | Create a Department entity instance. |
| `Object(data?)` | `ObjectEntity` | Create an Object entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `tester(testopts?, sdkopts?)` | `MetMuseumCollectionSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `MetMuseumCollectionSDK.test(testopts?, sdkopts?)` | `MetMuseumCollectionSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): MetMuseumCollectionSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Department

| Field | Description |
| --- | --- |
| `departmentId` | Unique identifier for the department |
| `displayName` | Display name of the department |

Operations: list.

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

Operations: list, load.

API path: `/objects`

#### Search

| Field | Description |
| --- | --- |
| `objectIDs` | An array containing the object IDs of matching objects |
| `total` | The total number of objects matching the search query |

Operations: list.

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
| `departmentId` | `number` | Unique identifier for the department |
| `displayName` | `string` | Display name of the department |

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
| `GalleryNumber` | `string` | Gallery number, where available |
| `accessionNumber` | `string` | Identifying number for each artwork (not always unique) |
| `accessionYear` | `string` | Year the artwork was acquired |
| `additionalImages` | `any[]` | An array containing URLs to the additional images of an object in JPEG format |
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
| `constituents` | `any[]` | An array containing the constituents associated with an object |
| `country` | `string` | Country where the artwork was created or found |
| `county` | `string` | County where the artwork was created |
| `creditLine` | `string` | Text acknowledging the source or origin of the artwork and the year the object was acquired |
| `culture` | `string` | Information about the culture, or people from which an object was created |
| `department` | `string` | Indicates The Met's curatorial department responsible for the artwork |
| `dimensions` | `string` | Size of the artwork or object |
| `dimensionsParsed` | `any[]` | Size of the artwork or object in centimeters, parsed |
| `dynasty` | `string` | Dynasty under which an object was created |
| `excavation` | `string` | The name of an excavation |
| `geographyType` | `string` | Qualifying information that describes the relationship of the place catalogued to the object |
| `id` | `string` |  |
| `isHighlight` | `boolean` | When true indicates a popular and important artwork in the collection |
| `isPublicDomain` | `boolean` | When true indicates an artwork in the Public Domain |
| `isTimelineWork` | `boolean` | Whether the object is on the Timeline of Art History website |
| `linkResource` | `string` | URL to object's page on metmuseum.org |
| `locale` | `string` | Geographic location more specific than subregion |
| `locus` | `string` | Geographic location that is less specific than locale |
| `measurements` | `any[]` | Array of elements with measurements. |
| `medium` | `string` | Refers to the materials that were used to create the artwork |
| `metadataDate` | `string` | Date metadata was last updated |
| `objectBeginDate` | `number` | Machine readable date indicating the year the artwork was started to be created |
| `objectDate` | `string` | Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created |
| `objectEndDate` | `number` | Machine readable date indicating the year the artwork was completed |
| `objectID` | `number` | Identifying number for each artwork (unique, can be used as key field) |
| `objectIDs` | `any[]` | An array containing the object ID of publicly-available objects |
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
| `tags` | `any[]` | An array of subject keyword tags associated with the object |
| `title` | `string` | Title, identifying phrase, or name given to a work of art |
| `total` | `number` | The total number of publicly-available objects |

#### Example: Load

```ts
const object = await client.Object().load({ id: 1 })
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
| `objectIDs` | `any[]` | An array containing the object IDs of matching objects |
| `total` | `number` | The total number of objects matching the search query |

#### Example: List

```ts
const searchs = await client.Search().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
met-museum-collection/
├── src/
│   ├── MetMuseumCollectionSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { MetMuseumCollectionSDK } from '@voxgig-sdk/met-museum-collection-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const search = client.Search()
await search.list()

// search.data() now returns the search data from the last `list`
// search.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
