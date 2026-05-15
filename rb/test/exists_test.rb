# MetMuseumCollection SDK exists test

require "minitest/autorun"
require_relative "../MetMuseumCollection_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MetMuseumCollectionSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
