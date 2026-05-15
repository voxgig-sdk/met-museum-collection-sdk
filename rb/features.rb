# MetMuseumCollection SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MetMuseumCollectionFeatures
  def self.make_feature(name)
    case name
    when "base"
      MetMuseumCollectionBaseFeature.new
    when "test"
      MetMuseumCollectionTestFeature.new
    else
      MetMuseumCollectionBaseFeature.new
    end
  end
end
