# MetMuseumCollection SDK utility: make_context
require_relative '../core/context'
module MetMuseumCollectionUtilities
  MakeContext = ->(ctxmap, basectx) {
    MetMuseumCollectionContext.new(ctxmap, basectx)
  }
end
