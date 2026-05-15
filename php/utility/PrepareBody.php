<?php
declare(strict_types=1);

// MetMuseumCollection SDK utility: prepare_body

class MetMuseumCollectionPrepareBody
{
    public static function call(MetMuseumCollectionContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
