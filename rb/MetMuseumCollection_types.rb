# frozen_string_literal: true

# Typed models for the MetMuseumCollection SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Department entity data model.
#
# @!attribute [rw] departmentId
#   @return [Integer, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
Department = Struct.new(
  :departmentId,
  :displayName,
  keyword_init: true
)

# Request payload for Department#list.
#
# @!attribute [rw] departmentId
#   @return [Integer, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
DepartmentListMatch = Struct.new(
  :departmentId,
  :displayName,
  keyword_init: true
)

# Object entity data model.
#
# @!attribute [rw] GalleryNumber
#   @return [String, nil]
#
# @!attribute [rw] accessionNumber
#   @return [String, nil]
#
# @!attribute [rw] accessionYear
#   @return [String, nil]
#
# @!attribute [rw] additionalImages
#   @return [Array, nil]
#
# @!attribute [rw] artistAlphaSort
#   @return [String, nil]
#
# @!attribute [rw] artistBeginDate
#   @return [String, nil]
#
# @!attribute [rw] artistDisplayBio
#   @return [String, nil]
#
# @!attribute [rw] artistDisplayName
#   @return [String, nil]
#
# @!attribute [rw] artistEndDate
#   @return [String, nil]
#
# @!attribute [rw] artistGender
#   @return [String, nil]
#
# @!attribute [rw] artistNationality
#   @return [String, nil]
#
# @!attribute [rw] artistPrefix
#   @return [String, nil]
#
# @!attribute [rw] artistRole
#   @return [String, nil]
#
# @!attribute [rw] artistSuffix
#   @return [String, nil]
#
# @!attribute [rw] artistULAN_URL
#   @return [String, nil]
#
# @!attribute [rw] artistWikidata_URL
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] constituents
#   @return [Array, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] county
#   @return [String, nil]
#
# @!attribute [rw] creditLine
#   @return [String, nil]
#
# @!attribute [rw] culture
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] dimensions
#   @return [String, nil]
#
# @!attribute [rw] dimensionsParsed
#   @return [Array, nil]
#
# @!attribute [rw] dynasty
#   @return [String, nil]
#
# @!attribute [rw] excavation
#   @return [String, nil]
#
# @!attribute [rw] geographyType
#   @return [String, nil]
#
# @!attribute [rw] isHighlight
#   @return [Boolean, nil]
#
# @!attribute [rw] isPublicDomain
#   @return [Boolean, nil]
#
# @!attribute [rw] isTimelineWork
#   @return [Boolean, nil]
#
# @!attribute [rw] linkResource
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] locus
#   @return [String, nil]
#
# @!attribute [rw] measurements
#   @return [Array, nil]
#
# @!attribute [rw] medium
#   @return [String, nil]
#
# @!attribute [rw] metadataDate
#   @return [String, nil]
#
# @!attribute [rw] objectBeginDate
#   @return [Integer, nil]
#
# @!attribute [rw] objectDate
#   @return [String, nil]
#
# @!attribute [rw] objectEndDate
#   @return [Integer, nil]
#
# @!attribute [rw] objectID
#   @return [Integer, nil]
#
# @!attribute [rw] objectIDs
#   @return [Array, nil]
#
# @!attribute [rw] objectName
#   @return [String, nil]
#
# @!attribute [rw] objectURL
#   @return [String, nil]
#
# @!attribute [rw] objectWikidata_URL
#   @return [String, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] portfolio
#   @return [String, nil]
#
# @!attribute [rw] primaryImage
#   @return [String, nil]
#
# @!attribute [rw] primaryImageSmall
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] reign
#   @return [String, nil]
#
# @!attribute [rw] repository
#   @return [String, nil]
#
# @!attribute [rw] rightsAndReproduction
#   @return [String, nil]
#
# @!attribute [rw] river
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] subregion
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
ObjectType = Struct.new(
  :GalleryNumber,
  :accessionNumber,
  :accessionYear,
  :additionalImages,
  :artistAlphaSort,
  :artistBeginDate,
  :artistDisplayBio,
  :artistDisplayName,
  :artistEndDate,
  :artistGender,
  :artistNationality,
  :artistPrefix,
  :artistRole,
  :artistSuffix,
  :artistULAN_URL,
  :artistWikidata_URL,
  :city,
  :classification,
  :constituents,
  :country,
  :county,
  :creditLine,
  :culture,
  :department,
  :dimensions,
  :dimensionsParsed,
  :dynasty,
  :excavation,
  :geographyType,
  :isHighlight,
  :isPublicDomain,
  :isTimelineWork,
  :linkResource,
  :locale,
  :locus,
  :measurements,
  :medium,
  :metadataDate,
  :objectBeginDate,
  :objectDate,
  :objectEndDate,
  :objectID,
  :objectIDs,
  :objectName,
  :objectURL,
  :objectWikidata_URL,
  :period,
  :portfolio,
  :primaryImage,
  :primaryImageSmall,
  :region,
  :reign,
  :repository,
  :rightsAndReproduction,
  :river,
  :state,
  :subregion,
  :tags,
  :title,
  :total,
  keyword_init: true
)

# Request payload for Object#load.
#
# @!attribute [rw] id
#   @return [Integer]
ObjectLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Object#list.
#
# @!attribute [rw] GalleryNumber
#   @return [String, nil]
#
# @!attribute [rw] accessionNumber
#   @return [String, nil]
#
# @!attribute [rw] accessionYear
#   @return [String, nil]
#
# @!attribute [rw] additionalImages
#   @return [Array, nil]
#
# @!attribute [rw] artistAlphaSort
#   @return [String, nil]
#
# @!attribute [rw] artistBeginDate
#   @return [String, nil]
#
# @!attribute [rw] artistDisplayBio
#   @return [String, nil]
#
# @!attribute [rw] artistDisplayName
#   @return [String, nil]
#
# @!attribute [rw] artistEndDate
#   @return [String, nil]
#
# @!attribute [rw] artistGender
#   @return [String, nil]
#
# @!attribute [rw] artistNationality
#   @return [String, nil]
#
# @!attribute [rw] artistPrefix
#   @return [String, nil]
#
# @!attribute [rw] artistRole
#   @return [String, nil]
#
# @!attribute [rw] artistSuffix
#   @return [String, nil]
#
# @!attribute [rw] artistULAN_URL
#   @return [String, nil]
#
# @!attribute [rw] artistWikidata_URL
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] constituents
#   @return [Array, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] county
#   @return [String, nil]
#
# @!attribute [rw] creditLine
#   @return [String, nil]
#
# @!attribute [rw] culture
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] dimensions
#   @return [String, nil]
#
# @!attribute [rw] dimensionsParsed
#   @return [Array, nil]
#
# @!attribute [rw] dynasty
#   @return [String, nil]
#
# @!attribute [rw] excavation
#   @return [String, nil]
#
# @!attribute [rw] geographyType
#   @return [String, nil]
#
# @!attribute [rw] isHighlight
#   @return [Boolean, nil]
#
# @!attribute [rw] isPublicDomain
#   @return [Boolean, nil]
#
# @!attribute [rw] isTimelineWork
#   @return [Boolean, nil]
#
# @!attribute [rw] linkResource
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] locus
#   @return [String, nil]
#
# @!attribute [rw] measurements
#   @return [Array, nil]
#
# @!attribute [rw] medium
#   @return [String, nil]
#
# @!attribute [rw] metadataDate
#   @return [String, nil]
#
# @!attribute [rw] objectBeginDate
#   @return [Integer, nil]
#
# @!attribute [rw] objectDate
#   @return [String, nil]
#
# @!attribute [rw] objectEndDate
#   @return [Integer, nil]
#
# @!attribute [rw] objectID
#   @return [Integer, nil]
#
# @!attribute [rw] objectIDs
#   @return [Array, nil]
#
# @!attribute [rw] objectName
#   @return [String, nil]
#
# @!attribute [rw] objectURL
#   @return [String, nil]
#
# @!attribute [rw] objectWikidata_URL
#   @return [String, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] portfolio
#   @return [String, nil]
#
# @!attribute [rw] primaryImage
#   @return [String, nil]
#
# @!attribute [rw] primaryImageSmall
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] reign
#   @return [String, nil]
#
# @!attribute [rw] repository
#   @return [String, nil]
#
# @!attribute [rw] rightsAndReproduction
#   @return [String, nil]
#
# @!attribute [rw] river
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] subregion
#   @return [String, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
ObjectListMatch = Struct.new(
  :GalleryNumber,
  :accessionNumber,
  :accessionYear,
  :additionalImages,
  :artistAlphaSort,
  :artistBeginDate,
  :artistDisplayBio,
  :artistDisplayName,
  :artistEndDate,
  :artistGender,
  :artistNationality,
  :artistPrefix,
  :artistRole,
  :artistSuffix,
  :artistULAN_URL,
  :artistWikidata_URL,
  :city,
  :classification,
  :constituents,
  :country,
  :county,
  :creditLine,
  :culture,
  :department,
  :dimensions,
  :dimensionsParsed,
  :dynasty,
  :excavation,
  :geographyType,
  :isHighlight,
  :isPublicDomain,
  :isTimelineWork,
  :linkResource,
  :locale,
  :locus,
  :measurements,
  :medium,
  :metadataDate,
  :objectBeginDate,
  :objectDate,
  :objectEndDate,
  :objectID,
  :objectIDs,
  :objectName,
  :objectURL,
  :objectWikidata_URL,
  :period,
  :portfolio,
  :primaryImage,
  :primaryImageSmall,
  :region,
  :reign,
  :repository,
  :rightsAndReproduction,
  :river,
  :state,
  :subregion,
  :tags,
  :title,
  :total,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] objectIDs
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
Search = Struct.new(
  :objectIDs,
  :total,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] objectIDs
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
SearchListMatch = Struct.new(
  :objectIDs,
  :total,
  keyword_init: true
)

