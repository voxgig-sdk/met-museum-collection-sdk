# MetMuseumCollection SDK utility: prepare_body
require_relative 'media'
module MetMuseumCollectionUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MetMuseumCollectionUtilities.raw_body(ctx.reqdata) if MetMuseumCollectionUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
