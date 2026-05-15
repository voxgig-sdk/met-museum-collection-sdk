# MetMuseumCollection SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MetMuseumCollectionUtility.registrar = ->(u) {
  u.clean = MetMuseumCollectionUtilities::Clean
  u.done = MetMuseumCollectionUtilities::Done
  u.make_error = MetMuseumCollectionUtilities::MakeError
  u.feature_add = MetMuseumCollectionUtilities::FeatureAdd
  u.feature_hook = MetMuseumCollectionUtilities::FeatureHook
  u.feature_init = MetMuseumCollectionUtilities::FeatureInit
  u.fetcher = MetMuseumCollectionUtilities::Fetcher
  u.make_fetch_def = MetMuseumCollectionUtilities::MakeFetchDef
  u.make_context = MetMuseumCollectionUtilities::MakeContext
  u.make_options = MetMuseumCollectionUtilities::MakeOptions
  u.make_request = MetMuseumCollectionUtilities::MakeRequest
  u.make_response = MetMuseumCollectionUtilities::MakeResponse
  u.make_result = MetMuseumCollectionUtilities::MakeResult
  u.make_point = MetMuseumCollectionUtilities::MakePoint
  u.make_spec = MetMuseumCollectionUtilities::MakeSpec
  u.make_url = MetMuseumCollectionUtilities::MakeUrl
  u.param = MetMuseumCollectionUtilities::Param
  u.prepare_auth = MetMuseumCollectionUtilities::PrepareAuth
  u.prepare_body = MetMuseumCollectionUtilities::PrepareBody
  u.prepare_headers = MetMuseumCollectionUtilities::PrepareHeaders
  u.prepare_method = MetMuseumCollectionUtilities::PrepareMethod
  u.prepare_params = MetMuseumCollectionUtilities::PrepareParams
  u.prepare_path = MetMuseumCollectionUtilities::PreparePath
  u.prepare_query = MetMuseumCollectionUtilities::PrepareQuery
  u.result_basic = MetMuseumCollectionUtilities::ResultBasic
  u.result_body = MetMuseumCollectionUtilities::ResultBody
  u.result_headers = MetMuseumCollectionUtilities::ResultHeaders
  u.transform_request = MetMuseumCollectionUtilities::TransformRequest
  u.transform_response = MetMuseumCollectionUtilities::TransformResponse
}
