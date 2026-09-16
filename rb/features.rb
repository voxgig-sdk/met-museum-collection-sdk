# MetMuseumCollection SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MetMuseumCollectionFeatures
  def self.make_feature(name)
    case name
    when "base"
      MetMuseumCollectionBaseFeature.new
    when "ratelimit"
      MetMuseumCollectionRatelimitFeature.new
    when "retry"
      MetMuseumCollectionRetryFeature.new
    when "test"
      MetMuseumCollectionTestFeature.new
    when "timeout"
      MetMuseumCollectionTimeoutFeature.new
    else
      MetMuseumCollectionBaseFeature.new
    end
  end
end
