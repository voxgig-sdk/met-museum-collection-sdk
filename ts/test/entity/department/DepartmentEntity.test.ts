

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


describe('DepartmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE.
  afterEach(liveDelay('MET_MUSEUM_COLLECTION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MetMuseumCollectionSDK.test()
    const ent = testsdk.Department()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'department.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"departmentId","req":false,"short":"Unique identifier for the department","type":"`$INTEGER`","index$":0},{"active":true,"name":"displayName","req":false,"short":"Display name of the department","type":"`$STRING`","index$":1}],"name":"department","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /departments","json":"{\"operationId\":\"getDepartments\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"departments\":{\"description\":\"An array of departments\",\"items\":{\"properties\":{\"departmentId\":{\"description\":\"Unique identifier for the department\",\"type\":\"integer\"},\"displayName\":{\"description\":\"Display name of the department\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded (80 requests per second)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/departments","segments":[{"lit":"departments"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.departments`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"department","name__orig":"department","Name":"Department","name_":"department","name-":"department","NAME":"DEPARTMENT","index$":0}, {"active":true,"entity":"department","key$":"BasicDepartmentFlow","kind":"basic","name":"BasicDepartmentFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"department_ref01"}}],"index$":0}]}, 'Department')
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
  
