

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MetMuseumCollectionSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('search hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of MetMuseumCollectionSDK.test(offline).Search().stream('list')) { }
    }, /offline/)

    for await (const _item of MetMuseumCollectionSDK.test(offline).Search()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = MetMuseumCollectionSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Search().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of MetMuseumCollectionSDK.test().Search().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new MetMuseumCollectionSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Search().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Search().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MetMuseumCollectionSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Search().list({"artist_or_culture":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"objectIDs":{"a":true,"h":"Object I Ds","n":"objectIDs","r":false,"sh":"An array containing the object IDs of matching objects","t":"`$ARRAY`","key$":"objectIDs","index$":0},"total":{"a":true,"h":"Total","n":"total","r":false,"sh":"The total number of objects matching the search query","t":"`$INTEGER`","key$":"total","index$":1}},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":true,"k":"query","n":"artist_or_culture","or":"artistOrCulture","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":1800,"k":"query","n":"date_begin","or":"dateBegin","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":1900,"k":"query","n":"date_end","or":"dateEnd","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":11,"k":"query","n":"department_id","or":"departmentId","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"Europe","k":"query","n":"geo_location","or":"geoLocation","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":true,"k":"query","n":"has_image","or":"hasImages","r":false,"t":"`$BOOLEAN`","index$":5},{"a":true,"ex":true,"k":"query","n":"is_highlight","or":"isHighlight","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"ex":true,"k":"query","n":"is_on_view","or":"isOnView","r":false,"t":"`$BOOLEAN`","index$":7},{"a":true,"ex":"Paintings","k":"query","n":"medium","or":"medium","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":"sunflowers","k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":true,"k":"query","n":"tag","or":"tags","r":false,"t":"`$BOOLEAN`","index$":10},{"a":true,"ex":true,"k":"query","n":"title","or":"title","r":false,"t":"`$BOOLEAN`","index$":11}]},"k":"http","m":"GET","o":"/search","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.objectIDs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":2}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","parameters":[{"name":"q","in":"query","description":"Search term to query the objects","required":false,"schema":{"type":"string","example":"sunflowers"},"index$":0},{"name":"title","in":"query","description":"Search against the title field","required":false,"schema":{"type":"boolean","example":true},"index$":1},{"name":"tags","in":"query","description":"Search for objects using the subject keyword tags field","required":false,"schema":{"type":"boolean","example":true},"index$":2},{"name":"departmentId","in":"query","description":"Filter by department ID","required":false,"schema":{"type":"integer","example":11},"index$":3},{"name":"isHighlight","in":"query","description":"Filter to highlight objects only","required":false,"schema":{"type":"boolean","example":true},"index$":4},{"name":"isOnView","in":"query","description":"Filter to objects currently on view","required":false,"schema":{"type":"boolean","example":true},"index$":5},{"name":"artistOrCulture","in":"query","description":"Filter by artist name or culture","required":false,"schema":{"type":"boolean","example":true},"index$":6},{"name":"medium","in":"query","description":"Filter by medium","required":false,"schema":{"type":"string","example":"Paintings"},"index$":7},{"name":"hasImages","in":"query","description":"Filter to objects that have images","required":false,"schema":{"type":"boolean","example":true},"index$":8},{"name":"geoLocation","in":"query","description":"Filter by geographic location","required":false,"schema":{"type":"string","example":"Europe"},"index$":9},{"name":"dateBegin","in":"query","description":"Filter by artwork begin date (integer year)","required":false,"schema":{"type":"integer","example":1800},"index$":10},{"name":"dateEnd","in":"query","description":"Filter by artwork end date (integer year)","required":false,"schema":{"type":"integer","example":1900},"index$":11}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
