<?php
declare(strict_types=1);

// MetMuseumCollection SDK utility: feature_add

class MetMuseumCollectionFeatureAdd
{
    public static function call(MetMuseumCollectionContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
