
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MetMuseumCollectionSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MetMuseumCollectionSDK.test()
    equal(null !== testsdk, true)
  })

})
