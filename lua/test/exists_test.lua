-- ProjectName SDK exists test

local sdk = require("met-museum-collection_sdk")

describe("MetMuseumCollectionSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
