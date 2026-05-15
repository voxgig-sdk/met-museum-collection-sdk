<?php
declare(strict_types=1);

// MetMuseumCollection SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class MetMuseumCollectionFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new MetMuseumCollectionBaseFeature();
            case "test":
                return new MetMuseumCollectionTestFeature();
            default:
                return new MetMuseumCollectionBaseFeature();
        }
    }
}
