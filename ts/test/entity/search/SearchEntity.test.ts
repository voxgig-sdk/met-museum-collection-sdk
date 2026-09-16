

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MetMuseumCollectionSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE.
  afterEach(liveDelay('MET_MUSEUM_COLLECTION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MetMuseumCollectionSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"objectIDs","req":false,"short":"An array containing the object IDs of matching objects","type":"`$ARRAY`","index$":0},{"active":true,"name":"total","req":false,"short":"The total number of objects matching the search query","type":"`$INTEGER`","index$":1}],"name":"search","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":true,"kind":"query","name":"artist_or_culture","orig":"artist_or_culture","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":1800,"kind":"query","name":"date_begin","orig":"date_begin","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":1900,"kind":"query","name":"date_end","orig":"date_end","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":11,"kind":"query","name":"department_id","orig":"department_id","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"example":"Europe","kind":"query","name":"geo_location","orig":"geo_location","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":true,"kind":"query","name":"has_image","orig":"has_image","reqd":false,"type":"`$BOOLEAN`","index$":5},{"active":true,"example":true,"kind":"query","name":"is_highlight","orig":"is_highlight","reqd":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"example":true,"kind":"query","name":"is_on_view","orig":"is_on_view","reqd":false,"type":"`$BOOLEAN`","index$":7},{"active":true,"example":"Paintings","kind":"query","name":"medium","orig":"medium","reqd":false,"type":"`$STRING`","index$":8},{"active":true,"example":"sunflowers","kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":9},{"active":true,"example":true,"kind":"query","name":"tag","orig":"tag","reqd":false,"type":"`$BOOLEAN`","index$":10},{"active":true,"example":true,"kind":"query","name":"title","orig":"title","reqd":false,"type":"`$BOOLEAN`","index$":11}]},"contract":{"id":"GET /search","json":"{\"operationId\":\"searchObjects\",\"parameters\":[{\"description\":\"Search term to query the objects\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"example\":\"sunflowers\",\"type\":\"string\"}},{\"description\":\"Search against the title field\",\"in\":\"query\",\"name\":\"title\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Search for objects using the subject keyword tags field\",\"in\":\"query\",\"name\":\"tags\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Filter by department ID\",\"in\":\"query\",\"name\":\"departmentId\",\"required\":false,\"schema\":{\"example\":11,\"type\":\"integer\"}},{\"description\":\"Filter to highlight objects only\",\"in\":\"query\",\"name\":\"isHighlight\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Filter to objects currently on view\",\"in\":\"query\",\"name\":\"isOnView\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Filter by artist name or culture\",\"in\":\"query\",\"name\":\"artistOrCulture\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Filter by medium\",\"in\":\"query\",\"name\":\"medium\",\"required\":false,\"schema\":{\"example\":\"Paintings\",\"type\":\"string\"}},{\"description\":\"Filter to objects that have images\",\"in\":\"query\",\"name\":\"hasImages\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Filter by geographic location\",\"in\":\"query\",\"name\":\"geoLocation\",\"required\":false,\"schema\":{\"example\":\"Europe\",\"type\":\"string\"}},{\"description\":\"Filter by artwork begin date (integer year)\",\"in\":\"query\",\"name\":\"dateBegin\",\"required\":false,\"schema\":{\"example\":1800,\"type\":\"integer\"}},{\"description\":\"Filter by artwork end date (integer year)\",\"in\":\"query\",\"name\":\"dateEnd\",\"required\":false,\"schema\":{\"example\":1900,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"objectIDs\":{\"description\":\"An array containing the object IDs of matching objects\",\"items\":{\"type\":\"integer\"},\"nullable\":true,\"type\":\"array\"},\"total\":{\"description\":\"The total number of objects matching the search query\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded (80 requests per second)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search","segments":[{"lit":"search"}],"select":{"exist":["artist_or_culture","date_begin","date_end","department_id","geo_location","has_image","is_highlight","is_on_view","medium","q","tag","title"]},"transform":{"req":"`reqdata`","res":"`body.objectIDs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":2}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MetMuseumCollectionSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MET_MUSEUM_COLLECTION_TEST_SEARCH_ENTID': idmap,
    'MET_MUSEUM_COLLECTION_TEST_LIVE': 'FALSE',
    'MET_MUSEUM_COLLECTION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MET_MUSEUM_COLLECTION_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.MET_MUSEUM_COLLECTION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MET_MUSEUM_COLLECTION_TEST_SEARCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MetMuseumCollectionSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MET_MUSEUM_COLLECTION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
