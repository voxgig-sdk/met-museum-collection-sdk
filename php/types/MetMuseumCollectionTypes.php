<?php
declare(strict_types=1);

// Typed models for the MetMuseumCollection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Department entity data model. */
class Department
{
    public ?int $departmentId = null;
    public ?string $displayName = null;
}

/** Request payload for Department#list. */
class DepartmentListMatch
{
    public ?int $departmentId = null;
    public ?string $displayName = null;
}

/** Object entity data model. */
class Object
{
    public ?string $GalleryNumber = null;
    public ?string $accessionNumber = null;
    public ?string $accessionYear = null;
    public ?array $additionalImages = null;
    public ?string $artistAlphaSort = null;
    public ?string $artistBeginDate = null;
    public ?string $artistDisplayBio = null;
    public ?string $artistDisplayName = null;
    public ?string $artistEndDate = null;
    public ?string $artistGender = null;
    public ?string $artistNationality = null;
    public ?string $artistPrefix = null;
    public ?string $artistRole = null;
    public ?string $artistSuffix = null;
    public ?string $artistULAN_URL = null;
    public ?string $artistWikidata_URL = null;
    public ?string $city = null;
    public ?string $classification = null;
    public ?array $constituents = null;
    public ?string $country = null;
    public ?string $county = null;
    public ?string $creditLine = null;
    public ?string $culture = null;
    public ?string $department = null;
    public ?string $dimensions = null;
    public ?array $dimensionsParsed = null;
    public ?string $dynasty = null;
    public ?string $excavation = null;
    public ?string $geographyType = null;
    public ?bool $isHighlight = null;
    public ?bool $isPublicDomain = null;
    public ?bool $isTimelineWork = null;
    public ?string $linkResource = null;
    public ?string $locale = null;
    public ?string $locus = null;
    public ?array $measurements = null;
    public ?string $medium = null;
    public ?string $metadataDate = null;
    public ?int $objectBeginDate = null;
    public ?string $objectDate = null;
    public ?int $objectEndDate = null;
    public ?int $objectID = null;
    public ?array $objectIDs = null;
    public ?string $objectName = null;
    public ?string $objectURL = null;
    public ?string $objectWikidata_URL = null;
    public ?string $period = null;
    public ?string $portfolio = null;
    public ?string $primaryImage = null;
    public ?string $primaryImageSmall = null;
    public ?string $region = null;
    public ?string $reign = null;
    public ?string $repository = null;
    public ?string $rightsAndReproduction = null;
    public ?string $river = null;
    public ?string $state = null;
    public ?string $subregion = null;
    public ?array $tags = null;
    public ?string $title = null;
    public ?int $total = null;
}

/** Request payload for Object#load. */
class ObjectLoadMatch
{
    public int $id;
}

/** Request payload for Object#list. */
class ObjectListMatch
{
    public ?string $GalleryNumber = null;
    public ?string $accessionNumber = null;
    public ?string $accessionYear = null;
    public ?array $additionalImages = null;
    public ?string $artistAlphaSort = null;
    public ?string $artistBeginDate = null;
    public ?string $artistDisplayBio = null;
    public ?string $artistDisplayName = null;
    public ?string $artistEndDate = null;
    public ?string $artistGender = null;
    public ?string $artistNationality = null;
    public ?string $artistPrefix = null;
    public ?string $artistRole = null;
    public ?string $artistSuffix = null;
    public ?string $artistULAN_URL = null;
    public ?string $artistWikidata_URL = null;
    public ?string $city = null;
    public ?string $classification = null;
    public ?array $constituents = null;
    public ?string $country = null;
    public ?string $county = null;
    public ?string $creditLine = null;
    public ?string $culture = null;
    public ?string $department = null;
    public ?string $dimensions = null;
    public ?array $dimensionsParsed = null;
    public ?string $dynasty = null;
    public ?string $excavation = null;
    public ?string $geographyType = null;
    public ?bool $isHighlight = null;
    public ?bool $isPublicDomain = null;
    public ?bool $isTimelineWork = null;
    public ?string $linkResource = null;
    public ?string $locale = null;
    public ?string $locus = null;
    public ?array $measurements = null;
    public ?string $medium = null;
    public ?string $metadataDate = null;
    public ?int $objectBeginDate = null;
    public ?string $objectDate = null;
    public ?int $objectEndDate = null;
    public ?int $objectID = null;
    public ?array $objectIDs = null;
    public ?string $objectName = null;
    public ?string $objectURL = null;
    public ?string $objectWikidata_URL = null;
    public ?string $period = null;
    public ?string $portfolio = null;
    public ?string $primaryImage = null;
    public ?string $primaryImageSmall = null;
    public ?string $region = null;
    public ?string $reign = null;
    public ?string $repository = null;
    public ?string $rightsAndReproduction = null;
    public ?string $river = null;
    public ?string $state = null;
    public ?string $subregion = null;
    public ?array $tags = null;
    public ?string $title = null;
    public ?int $total = null;
}

/** Search entity data model. */
class Search
{
    public ?array $objectIDs = null;
    public ?int $total = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?array $objectIDs = null;
    public ?int $total = null;
}

