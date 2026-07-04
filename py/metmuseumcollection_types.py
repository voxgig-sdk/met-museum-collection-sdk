# Typed models for the MetMuseumCollection SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Department:
    department_id: Optional[int] = None
    display_name: Optional[str] = None


@dataclass
class DepartmentListMatch:
    department_id: Optional[int] = None
    display_name: Optional[str] = None


@dataclass
class Object:
    accession_number: Optional[str] = None
    accession_year: Optional[str] = None
    additional_image: Optional[list] = None
    artist_alpha_sort: Optional[str] = None
    artist_begin_date: Optional[str] = None
    artist_display_bio: Optional[str] = None
    artist_display_name: Optional[str] = None
    artist_end_date: Optional[str] = None
    artist_gender: Optional[str] = None
    artist_nationality: Optional[str] = None
    artist_prefix: Optional[str] = None
    artist_role: Optional[str] = None
    artist_suffix: Optional[str] = None
    artist_ulan_url: Optional[str] = None
    artist_wikidata_url: Optional[str] = None
    city: Optional[str] = None
    classification: Optional[str] = None
    constituent: Optional[list] = None
    country: Optional[str] = None
    county: Optional[str] = None
    credit_line: Optional[str] = None
    culture: Optional[str] = None
    department: Optional[str] = None
    dimension: Optional[str] = None
    dimensions_parsed: Optional[list] = None
    dynasty: Optional[str] = None
    excavation: Optional[str] = None
    gallery_number: Optional[str] = None
    geography_type: Optional[str] = None
    is_highlight: Optional[bool] = None
    is_public_domain: Optional[bool] = None
    is_timeline_work: Optional[bool] = None
    link_resource: Optional[str] = None
    locale: Optional[str] = None
    locus: Optional[str] = None
    measurement: Optional[list] = None
    medium: Optional[str] = None
    metadata_date: Optional[str] = None
    object_begin_date: Optional[int] = None
    object_date: Optional[str] = None
    object_end_date: Optional[int] = None
    object_i_d: Optional[list] = None
    object_id: Optional[int] = None
    object_name: Optional[str] = None
    object_url: Optional[str] = None
    object_wikidata_url: Optional[str] = None
    period: Optional[str] = None
    portfolio: Optional[str] = None
    primary_image: Optional[str] = None
    primary_image_small: Optional[str] = None
    region: Optional[str] = None
    reign: Optional[str] = None
    repository: Optional[str] = None
    rights_and_reproduction: Optional[str] = None
    river: Optional[str] = None
    state: Optional[str] = None
    subregion: Optional[str] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    total: Optional[int] = None


@dataclass
class ObjectLoadMatch:
    id: int


@dataclass
class ObjectListMatch:
    accession_number: Optional[str] = None
    accession_year: Optional[str] = None
    additional_image: Optional[list] = None
    artist_alpha_sort: Optional[str] = None
    artist_begin_date: Optional[str] = None
    artist_display_bio: Optional[str] = None
    artist_display_name: Optional[str] = None
    artist_end_date: Optional[str] = None
    artist_gender: Optional[str] = None
    artist_nationality: Optional[str] = None
    artist_prefix: Optional[str] = None
    artist_role: Optional[str] = None
    artist_suffix: Optional[str] = None
    artist_ulan_url: Optional[str] = None
    artist_wikidata_url: Optional[str] = None
    city: Optional[str] = None
    classification: Optional[str] = None
    constituent: Optional[list] = None
    country: Optional[str] = None
    county: Optional[str] = None
    credit_line: Optional[str] = None
    culture: Optional[str] = None
    department: Optional[str] = None
    dimension: Optional[str] = None
    dimensions_parsed: Optional[list] = None
    dynasty: Optional[str] = None
    excavation: Optional[str] = None
    gallery_number: Optional[str] = None
    geography_type: Optional[str] = None
    is_highlight: Optional[bool] = None
    is_public_domain: Optional[bool] = None
    is_timeline_work: Optional[bool] = None
    link_resource: Optional[str] = None
    locale: Optional[str] = None
    locus: Optional[str] = None
    measurement: Optional[list] = None
    medium: Optional[str] = None
    metadata_date: Optional[str] = None
    object_begin_date: Optional[int] = None
    object_date: Optional[str] = None
    object_end_date: Optional[int] = None
    object_i_d: Optional[list] = None
    object_id: Optional[int] = None
    object_name: Optional[str] = None
    object_url: Optional[str] = None
    object_wikidata_url: Optional[str] = None
    period: Optional[str] = None
    portfolio: Optional[str] = None
    primary_image: Optional[str] = None
    primary_image_small: Optional[str] = None
    region: Optional[str] = None
    reign: Optional[str] = None
    repository: Optional[str] = None
    rights_and_reproduction: Optional[str] = None
    river: Optional[str] = None
    state: Optional[str] = None
    subregion: Optional[str] = None
    tag: Optional[list] = None
    title: Optional[str] = None
    total: Optional[int] = None


@dataclass
class Search:
    object_i_d: Optional[list] = None
    total: Optional[int] = None


@dataclass
class SearchListMatch:
    object_i_d: Optional[list] = None
    total: Optional[int] = None

