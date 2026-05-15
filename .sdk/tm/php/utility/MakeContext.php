<?php
declare(strict_types=1);

// MetMuseumCollection SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MetMuseumCollectionMakeContext
{
    public static function call(array $ctxmap, ?MetMuseumCollectionContext $basectx): MetMuseumCollectionContext
    {
        return new MetMuseumCollectionContext($ctxmap, $basectx);
    }
}
