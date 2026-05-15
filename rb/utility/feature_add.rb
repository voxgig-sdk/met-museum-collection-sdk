# MetMuseumCollection SDK utility: feature_add
module MetMuseumCollectionUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
