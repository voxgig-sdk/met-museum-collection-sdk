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
    public ?int $department_id = null;
    public ?string $display_name = null;
}

/** Match filter for Department#list (any subset of Department fields). */
class DepartmentListMatch
{
    public ?int $department_id = null;
    public ?string $display_name = null;
}

/** Object entity data model. */
class Object
{
    public ?string $accession_number = null;
    public ?string $accession_year = null;
    public ?array $additional_image = null;
    public ?string $artist_alpha_sort = null;
    public ?string $artist_begin_date = null;
    public ?string $artist_display_bio = null;
    public ?string $artist_display_name = null;
    public ?string $artist_end_date = null;
    public ?string $artist_gender = null;
    public ?string $artist_nationality = null;
    public ?string $artist_prefix = null;
    public ?string $artist_role = null;
    public ?string $artist_suffix = null;
    public ?string $artist_ulan_url = null;
    public ?string $artist_wikidata_url = null;
    public ?string $city = null;
    public ?string $classification = null;
    public ?array $constituent = null;
    public ?string $country = null;
    public ?string $county = null;
    public ?string $credit_line = null;
    public ?string $culture = null;
    public ?string $department = null;
    public ?string $dimension = null;
    public ?array $dimensions_parsed = null;
    public ?string $dynasty = null;
    public ?string $excavation = null;
    public ?string $gallery_number = null;
    public ?string $geography_type = null;
    public ?bool $is_highlight = null;
    public ?bool $is_public_domain = null;
    public ?bool $is_timeline_work = null;
    public ?string $link_resource = null;
    public ?string $locale = null;
    public ?string $locus = null;
    public ?array $measurement = null;
    public ?string $medium = null;
    public ?string $metadata_date = null;
    public ?int $object_begin_date = null;
    public ?string $object_date = null;
    public ?int $object_end_date = null;
    public ?array $object_i_d = null;
    public ?int $object_id = null;
    public ?string $object_name = null;
    public ?string $object_url = null;
    public ?string $object_wikidata_url = null;
    public ?string $period = null;
    public ?string $portfolio = null;
    public ?string $primary_image = null;
    public ?string $primary_image_small = null;
    public ?string $region = null;
    public ?string $reign = null;
    public ?string $repository = null;
    public ?string $rights_and_reproduction = null;
    public ?string $river = null;
    public ?string $state = null;
    public ?string $subregion = null;
    public ?array $tag = null;
    public ?string $title = null;
    public ?int $total = null;
}

/** Request payload for Object#load. */
class ObjectLoadMatch
{
    public int $id;
}

/** Match filter for Object#list (any subset of Object fields). */
class ObjectListMatch
{
    public ?string $accession_number = null;
    public ?string $accession_year = null;
    public ?array $additional_image = null;
    public ?string $artist_alpha_sort = null;
    public ?string $artist_begin_date = null;
    public ?string $artist_display_bio = null;
    public ?string $artist_display_name = null;
    public ?string $artist_end_date = null;
    public ?string $artist_gender = null;
    public ?string $artist_nationality = null;
    public ?string $artist_prefix = null;
    public ?string $artist_role = null;
    public ?string $artist_suffix = null;
    public ?string $artist_ulan_url = null;
    public ?string $artist_wikidata_url = null;
    public ?string $city = null;
    public ?string $classification = null;
    public ?array $constituent = null;
    public ?string $country = null;
    public ?string $county = null;
    public ?string $credit_line = null;
    public ?string $culture = null;
    public ?string $department = null;
    public ?string $dimension = null;
    public ?array $dimensions_parsed = null;
    public ?string $dynasty = null;
    public ?string $excavation = null;
    public ?string $gallery_number = null;
    public ?string $geography_type = null;
    public ?bool $is_highlight = null;
    public ?bool $is_public_domain = null;
    public ?bool $is_timeline_work = null;
    public ?string $link_resource = null;
    public ?string $locale = null;
    public ?string $locus = null;
    public ?array $measurement = null;
    public ?string $medium = null;
    public ?string $metadata_date = null;
    public ?int $object_begin_date = null;
    public ?string $object_date = null;
    public ?int $object_end_date = null;
    public ?array $object_i_d = null;
    public ?int $object_id = null;
    public ?string $object_name = null;
    public ?string $object_url = null;
    public ?string $object_wikidata_url = null;
    public ?string $period = null;
    public ?string $portfolio = null;
    public ?string $primary_image = null;
    public ?string $primary_image_small = null;
    public ?string $region = null;
    public ?string $reign = null;
    public ?string $repository = null;
    public ?string $rights_and_reproduction = null;
    public ?string $river = null;
    public ?string $state = null;
    public ?string $subregion = null;
    public ?array $tag = null;
    public ?string $title = null;
    public ?int $total = null;
}

/** Search entity data model. */
class Search
{
    public ?array $object_i_d = null;
    public ?int $total = null;
}

/** Match filter for Search#list (any subset of Search fields). */
class SearchListMatch
{
    public ?array $object_i_d = null;
    public ?int $total = null;
}

