package = "voxgig-sdk-met-museum-collection"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/met-museum-collection-sdk.git"
}
description = {
  summary = "MetMuseumCollection SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["met-museum-collection_sdk"] = "met-museum-collection_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
