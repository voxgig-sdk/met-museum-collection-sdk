
import { Context } from './Context'


class MetMuseumCollectionError extends Error {

  isMetMuseumCollectionError = true

  sdk = 'MetMuseumCollection'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MetMuseumCollectionError
}

