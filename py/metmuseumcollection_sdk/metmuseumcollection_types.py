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
    departmentId: int
    displayName: str


class DepartmentListMatch(TypedDict, total=False):
    departmentId: int
    displayName: str


class Object(TypedDict, total=False):
    GalleryNumber: str
    accessionNumber: str
    accessionYear: str
    additionalImages: list
    artistAlphaSort: str
    artistBeginDate: str
    artistDisplayBio: str
    artistDisplayName: str
    artistEndDate: str
    artistGender: str
    artistNationality: str
    artistPrefix: str
    artistRole: str
    artistSuffix: str
    artistULAN_URL: str
    artistWikidata_URL: str
    city: str
    classification: str
    constituents: list
    country: str
    county: str
    creditLine: str
    culture: str
    department: str
    dimensions: str
    dimensionsParsed: list
    dynasty: str
    excavation: str
    geographyType: str
    isHighlight: bool
    isPublicDomain: bool
    isTimelineWork: bool
    linkResource: str
    locale: str
    locus: str
    measurements: list
    medium: str
    metadataDate: str
    objectBeginDate: int
    objectDate: str
    objectEndDate: int
    objectID: int
    objectIDs: list
    objectName: str
    objectURL: str
    objectWikidata_URL: str
    period: str
    portfolio: str
    primaryImage: str
    primaryImageSmall: str
    region: str
    reign: str
    repository: str
    rightsAndReproduction: str
    river: str
    state: str
    subregion: str
    tags: list
    title: str
    total: int


class ObjectLoadMatch(TypedDict):
    id: int


class ObjectListMatch(TypedDict, total=False):
    GalleryNumber: str
    accessionNumber: str
    accessionYear: str
    additionalImages: list
    artistAlphaSort: str
    artistBeginDate: str
    artistDisplayBio: str
    artistDisplayName: str
    artistEndDate: str
    artistGender: str
    artistNationality: str
    artistPrefix: str
    artistRole: str
    artistSuffix: str
    artistULAN_URL: str
    artistWikidata_URL: str
    city: str
    classification: str
    constituents: list
    country: str
    county: str
    creditLine: str
    culture: str
    department: str
    dimensions: str
    dimensionsParsed: list
    dynasty: str
    excavation: str
    geographyType: str
    isHighlight: bool
    isPublicDomain: bool
    isTimelineWork: bool
    linkResource: str
    locale: str
    locus: str
    measurements: list
    medium: str
    metadataDate: str
    objectBeginDate: int
    objectDate: str
    objectEndDate: int
    objectID: int
    objectIDs: list
    objectName: str
    objectURL: str
    objectWikidata_URL: str
    period: str
    portfolio: str
    primaryImage: str
    primaryImageSmall: str
    region: str
    reign: str
    repository: str
    rightsAndReproduction: str
    river: str
    state: str
    subregion: str
    tags: list
    title: str
    total: int


class Search(TypedDict, total=False):
    objectIDs: list
    total: int


class SearchListMatch(TypedDict, total=False):
    objectIDs: list
    total: int
