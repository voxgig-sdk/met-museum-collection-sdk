<?php
declare(strict_types=1);

// MetMuseumCollection SDK utility: result_headers

class MetMuseumCollectionResultHeaders
{
    public static function call(MetMuseumCollectionContext $ctx): ?MetMuseumCollectionResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
