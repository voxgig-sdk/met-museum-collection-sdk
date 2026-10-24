

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


describe('DepartmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE.
  afterEach(liveDelay('MET_MUSEUM_COLLECTION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MetMuseumCollectionSDK.test()
    const ent = testsdk.Department()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('department hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of MetMuseumCollectionSDK.test(offline).Department().stream('list')) { }
    }, /offline/)

    for await (const _item of MetMuseumCollectionSDK.test(offline).Department()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = MetMuseumCollectionSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Department().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of MetMuseumCollectionSDK.test().Department().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new MetMuseumCollectionSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Department().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Department().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MetMuseumCollectionSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Department().list({"departmentId":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'department.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"departmentId":{"a":true,"h":"Department Id","n":"departmentId","r":false,"sh":"Unique identifier for the department","t":"`$INTEGER`","key$":"departmentId","index$":0},"displayName":{"a":true,"h":"Display Name","n":"displayName","r":false,"sh":"Display name of the department","t":"`$STRING`","key$":"displayName","index$":1}},"name":"department","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /departments","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/departments","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"departments"}],"t":{"req":"`reqdata`","res":"`body.departments`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"department","name__orig":"department","Name":"Department","name_":"department","name-":"department","NAME":"DEPARTMENT","index$":0}, {"active":true,"entity":"department","key$":"BasicDepartmentFlow","kind":"basic","name":"BasicDepartmentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"department_ref01"}}],"index$":0}]}, 'Department', {"GET /departments":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let department_ref01_data = Object.values(setup.data.existing.department)[0] as any

    // LIST
    const department_ref01_ent = client.Department()
    const department_ref01_match: any = {}

    const department_ref01_list = (await department_ref01_ent.list(department_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/department/DepartmentTestData.json')

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
    ['department01','department02','department03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MET_MUSEUM_COLLECTION_TEST_DEPARTMENT_ENTID': idmap,
    'MET_MUSEUM_COLLECTION_TEST_LIVE': 'FALSE',
    'MET_MUSEUM_COLLECTION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MET_MUSEUM_COLLECTION_TEST_DEPARTMENT_ENTID']

  const live = 'TRUE' === env.MET_MUSEUM_COLLECTION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MET_MUSEUM_COLLECTION_TEST_DEPARTMENT_ENTID']
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
  
