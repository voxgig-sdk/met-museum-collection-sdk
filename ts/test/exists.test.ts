
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MetMuseumCollectionSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MetMuseumCollectionSDK.test()
    equal(testsdk instanceof MetMuseumCollectionSDK, true,
      'MetMuseumCollectionSDK.test() must return a client synchronously')
  })

})
