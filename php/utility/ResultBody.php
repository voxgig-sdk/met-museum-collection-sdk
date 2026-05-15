<?php
declare(strict_types=1);

// MetMuseumCollection SDK utility: result_body

class MetMuseumCollectionResultBody
{
    public static function call(MetMuseumCollectionContext $ctx): ?MetMuseumCollectionResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
