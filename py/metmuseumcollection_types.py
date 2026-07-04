# Typed models for the MetMuseumCollection SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Department(TypedDict, total=False):
    department_id: int
    display_name: str


class DepartmentListMatch(TypedDict, total=False):
    department_id: int
    display_name: str


class Object(TypedDict, total=False):
    accession_number: str
    accession_year: str
    additional_image: list
    artist_alpha_sort: str
    artist_begin_date: str
    artist_display_bio: str
    artist_display_name: str
    artist_end_date: str
    artist_gender: str
    artist_nationality: str
    artist_prefix: str
    artist_role: str
    artist_suffix: str
    artist_ulan_url: str
    artist_wikidata_url: str
    city: str
    classification: str
    constituent: list
    country: str
    county: str
    credit_line: str
    culture: str
    department: str
    dimension: str
    dimensions_parsed: list
    dynasty: str
    excavation: str
    gallery_number: str
    geography_type: str
    is_highlight: bool
    is_public_domain: bool
    is_timeline_work: bool
    link_resource: str
    locale: str
    locus: str
    measurement: list
    medium: str
    metadata_date: str
    object_begin_date: int
    object_date: str
    object_end_date: int
    object_i_d: list
    object_id: int
    object_name: str
    object_url: str
    object_wikidata_url: str
    period: str
    portfolio: str
    primary_image: str
    primary_image_small: str
    region: str
    reign: str
    repository: str
    rights_and_reproduction: str
    river: str
    state: str
    subregion: str
    tag: list
    title: str
    total: int


class ObjectLoadMatch(TypedDict):
    id: int


class ObjectListMatch(TypedDict, total=False):
    accession_number: str
    accession_year: str
    additional_image: list
    artist_alpha_sort: str
    artist_begin_date: str
    artist_display_bio: str
    artist_display_name: str
    artist_end_date: str
    artist_gender: str
    artist_nationality: str
    artist_prefix: str
    artist_role: str
    artist_suffix: str
    artist_ulan_url: str
    artist_wikidata_url: str
    city: str
    classification: str
    constituent: list
    country: str
    county: str
    credit_line: str
    culture: str
    department: str
    dimension: str
    dimensions_parsed: list
    dynasty: str
    excavation: str
    gallery_number: str
    geography_type: str
    is_highlight: bool
    is_public_domain: bool
    is_timeline_work: bool
    link_resource: str
    locale: str
    locus: str
    measurement: list
    medium: str
    metadata_date: str
    object_begin_date: int
    object_date: str
    object_end_date: int
    object_i_d: list
    object_id: int
    object_name: str
    object_url: str
    object_wikidata_url: str
    period: str
    portfolio: str
    primary_image: str
    primary_image_small: str
    region: str
    reign: str
    repository: str
    rights_and_reproduction: str
    river: str
    state: str
    subregion: str
    tag: list
    title: str
    total: int


class Search(TypedDict, total=False):
    object_i_d: list
    total: int


class SearchListMatch(TypedDict, total=False):
    object_i_d: list
    total: int
