-- MetMuseumCollection SDK error

local MetMuseumCollectionError = {}
MetMuseumCollectionError.__index = MetMuseumCollectionError


function MetMuseumCollectionError.new(code, msg, ctx)
  local self = setmetatable({}, MetMuseumCollectionError)
  self.is_sdk_error = true
  self.sdk = "MetMuseumCollection"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MetMuseumCollectionError:error()
  return self.msg
end


function MetMuseumCollectionError:__tostring()
  return self.msg
end


return MetMuseumCollectionError
