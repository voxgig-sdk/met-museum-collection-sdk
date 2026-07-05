# MetMuseumCollection TypeScript SDK



The TypeScript SDK for the MetMuseumCollection API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Department()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/met-museum-collection-sdk/releases](https://github.com/voxgig-sdk/met-museum-collection-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { MetMuseumCollectionSDK } from '@voxgig-sdk/met-museum-collection'

const client = new MetMuseumCollectionSDK()
```

### 2. List department records

`list()` resolves to an array of Department objects — iterate it directly:

```ts
const departments = await client.Department().list()

for (const department of departments) {
  console.log(department)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const departments = await client.Department().list()
  console.log(departments)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const department = await client.Department().list()
// department is a bare entity populated with mock response data
console.log(department)
```

You can also use the instance method:

```ts
const client = new MetMuseumCollectionSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Department()

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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): MetMuseumCollectionSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

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
| `department_id` |  |
| `display_name` |  |

Operations: list.

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

Operations: list, load.

API path: `/objects`

#### Search

| Field | Description |
| --- | --- |
| `object_i_d` |  |
| `total` |  |

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
| `department_id` | `number` |  |
| `display_name` | `string` |  |

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
| `accession_number` | `string` |  |
| `accession_year` | `string` |  |
| `additional_image` | `any[]` |  |
| `artist_alpha_sort` | `string` |  |
| `artist_begin_date` | `string` |  |
| `artist_display_bio` | `string` |  |
| `artist_display_name` | `string` |  |
| `artist_end_date` | `string` |  |
| `artist_gender` | `string` |  |
| `artist_nationality` | `string` |  |
| `artist_prefix` | `string` |  |
| `artist_role` | `string` |  |
| `artist_suffix` | `string` |  |
| `artist_ulan_url` | `string` |  |
| `artist_wikidata_url` | `string` |  |
| `city` | `string` |  |
| `classification` | `string` |  |
| `constituent` | `any[]` |  |
| `country` | `string` |  |
| `county` | `string` |  |
| `credit_line` | `string` |  |
| `culture` | `string` |  |
| `department` | `string` |  |
| `dimension` | `string` |  |
| `dimensions_parsed` | `any[]` |  |
| `dynasty` | `string` |  |
| `excavation` | `string` |  |
| `gallery_number` | `string` |  |
| `geography_type` | `string` |  |
| `is_highlight` | `boolean` |  |
| `is_public_domain` | `boolean` |  |
| `is_timeline_work` | `boolean` |  |
| `link_resource` | `string` |  |
| `locale` | `string` |  |
| `locus` | `string` |  |
| `measurement` | `any[]` |  |
| `medium` | `string` |  |
| `metadata_date` | `string` |  |
| `object_begin_date` | `number` |  |
| `object_date` | `string` |  |
| `object_end_date` | `number` |  |
| `object_i_d` | `any[]` |  |
| `object_id` | `number` |  |
| `object_name` | `string` |  |
| `object_url` | `string` |  |
| `object_wikidata_url` | `string` |  |
| `period` | `string` |  |
| `portfolio` | `string` |  |
| `primary_image` | `string` |  |
| `primary_image_small` | `string` |  |
| `region` | `string` |  |
| `reign` | `string` |  |
| `repository` | `string` |  |
| `rights_and_reproduction` | `string` |  |
| `river` | `string` |  |
| `state` | `string` |  |
| `subregion` | `string` |  |
| `tag` | `any[]` |  |
| `title` | `string` |  |
| `total` | `number` |  |

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
| `object_i_d` | `any[]` |  |
| `total` | `number` |  |

#### Example: List

```ts
const searchs = await client.Search().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
import { MetMuseumCollectionSDK } from '@voxgig-sdk/met-museum-collection'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const department = client.Department()
await department.list()

// department.data() now returns the department data from the last `list`
// department.match() returns the last match criteria
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
