<?php
declare(strict_types=1);

// MetMuseumCollection SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MetMuseumCollectionUtility::setRegistrar(function (MetMuseumCollectionUtility $u): void {
    $u->clean = [MetMuseumCollectionClean::class, 'call'];
    $u->done = [MetMuseumCollectionDone::class, 'call'];
    $u->make_error = [MetMuseumCollectionMakeError::class, 'call'];
    $u->feature_add = [MetMuseumCollectionFeatureAdd::class, 'call'];
    $u->feature_hook = [MetMuseumCollectionFeatureHook::class, 'call'];
    $u->feature_init = [MetMuseumCollectionFeatureInit::class, 'call'];
    $u->fetcher = [MetMuseumCollectionFetcher::class, 'call'];
    $u->make_fetch_def = [MetMuseumCollectionMakeFetchDef::class, 'call'];
    $u->make_context = [MetMuseumCollectionMakeContext::class, 'call'];
    $u->make_options = [MetMuseumCollectionMakeOptions::class, 'call'];
    $u->make_request = [MetMuseumCollectionMakeRequest::class, 'call'];
    $u->make_response = [MetMuseumCollectionMakeResponse::class, 'call'];
    $u->make_result = [MetMuseumCollectionMakeResult::class, 'call'];
    $u->make_point = [MetMuseumCollectionMakePoint::class, 'call'];
    $u->make_spec = [MetMuseumCollectionMakeSpec::class, 'call'];
    $u->make_url = [MetMuseumCollectionMakeUrl::class, 'call'];
    $u->param = [MetMuseumCollectionParam::class, 'call'];
    $u->prepare_auth = [MetMuseumCollectionPrepareAuth::class, 'call'];
    $u->prepare_body = [MetMuseumCollectionPrepareBody::class, 'call'];
    $u->prepare_headers = [MetMuseumCollectionPrepareHeaders::class, 'call'];
    $u->prepare_method = [MetMuseumCollectionPrepareMethod::class, 'call'];
    $u->prepare_params = [MetMuseumCollectionPrepareParams::class, 'call'];
    $u->prepare_path = [MetMuseumCollectionPreparePath::class, 'call'];
    $u->prepare_query = [MetMuseumCollectionPrepareQuery::class, 'call'];
    $u->result_basic = [MetMuseumCollectionResultBasic::class, 'call'];
    $u->result_body = [MetMuseumCollectionResultBody::class, 'call'];
    $u->result_headers = [MetMuseumCollectionResultHeaders::class, 'call'];
    $u->transform_request = [MetMuseumCollectionTransformRequest::class, 'call'];
    $u->transform_response = [MetMuseumCollectionTransformResponse::class, 'call'];
});
