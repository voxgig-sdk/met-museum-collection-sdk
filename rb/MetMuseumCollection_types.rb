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
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] display_name
#   @return [String, nil]
Department = Struct.new(
  :department_id,
  :display_name,
  keyword_init: true
)

# Request payload for Department#list.
#
# @!attribute [rw] department_id
#   @return [Integer, nil]
#
# @!attribute [rw] display_name
#   @return [String, nil]
DepartmentListMatch = Struct.new(
  :department_id,
  :display_name,
  keyword_init: true
)

# Object entity data model.
#
# @!attribute [rw] accession_number
#   @return [String, nil]
#
# @!attribute [rw] accession_year
#   @return [String, nil]
#
# @!attribute [rw] additional_image
#   @return [Array, nil]
#
# @!attribute [rw] artist_alpha_sort
#   @return [String, nil]
#
# @!attribute [rw] artist_begin_date
#   @return [String, nil]
#
# @!attribute [rw] artist_display_bio
#   @return [String, nil]
#
# @!attribute [rw] artist_display_name
#   @return [String, nil]
#
# @!attribute [rw] artist_end_date
#   @return [String, nil]
#
# @!attribute [rw] artist_gender
#   @return [String, nil]
#
# @!attribute [rw] artist_nationality
#   @return [String, nil]
#
# @!attribute [rw] artist_prefix
#   @return [String, nil]
#
# @!attribute [rw] artist_role
#   @return [String, nil]
#
# @!attribute [rw] artist_suffix
#   @return [String, nil]
#
# @!attribute [rw] artist_ulan_url
#   @return [String, nil]
#
# @!attribute [rw] artist_wikidata_url
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] constituent
#   @return [Array, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] county
#   @return [String, nil]
#
# @!attribute [rw] credit_line
#   @return [String, nil]
#
# @!attribute [rw] culture
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] dimension
#   @return [String, nil]
#
# @!attribute [rw] dimensions_parsed
#   @return [Array, nil]
#
# @!attribute [rw] dynasty
#   @return [String, nil]
#
# @!attribute [rw] excavation
#   @return [String, nil]
#
# @!attribute [rw] gallery_number
#   @return [String, nil]
#
# @!attribute [rw] geography_type
#   @return [String, nil]
#
# @!attribute [rw] is_highlight
#   @return [Boolean, nil]
#
# @!attribute [rw] is_public_domain
#   @return [Boolean, nil]
#
# @!attribute [rw] is_timeline_work
#   @return [Boolean, nil]
#
# @!attribute [rw] link_resource
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] locus
#   @return [String, nil]
#
# @!attribute [rw] measurement
#   @return [Array, nil]
#
# @!attribute [rw] medium
#   @return [String, nil]
#
# @!attribute [rw] metadata_date
#   @return [String, nil]
#
# @!attribute [rw] object_begin_date
#   @return [Integer, nil]
#
# @!attribute [rw] object_date
#   @return [String, nil]
#
# @!attribute [rw] object_end_date
#   @return [Integer, nil]
#
# @!attribute [rw] object_i_d
#   @return [Array, nil]
#
# @!attribute [rw] object_id
#   @return [Integer, nil]
#
# @!attribute [rw] object_name
#   @return [String, nil]
#
# @!attribute [rw] object_url
#   @return [String, nil]
#
# @!attribute [rw] object_wikidata_url
#   @return [String, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] portfolio
#   @return [String, nil]
#
# @!attribute [rw] primary_image
#   @return [String, nil]
#
# @!attribute [rw] primary_image_small
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
# @!attribute [rw] rights_and_reproduction
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
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
Object = Struct.new(
  :accession_number,
  :accession_year,
  :additional_image,
  :artist_alpha_sort,
  :artist_begin_date,
  :artist_display_bio,
  :artist_display_name,
  :artist_end_date,
  :artist_gender,
  :artist_nationality,
  :artist_prefix,
  :artist_role,
  :artist_suffix,
  :artist_ulan_url,
  :artist_wikidata_url,
  :city,
  :classification,
  :constituent,
  :country,
  :county,
  :credit_line,
  :culture,
  :department,
  :dimension,
  :dimensions_parsed,
  :dynasty,
  :excavation,
  :gallery_number,
  :geography_type,
  :is_highlight,
  :is_public_domain,
  :is_timeline_work,
  :link_resource,
  :locale,
  :locus,
  :measurement,
  :medium,
  :metadata_date,
  :object_begin_date,
  :object_date,
  :object_end_date,
  :object_i_d,
  :object_id,
  :object_name,
  :object_url,
  :object_wikidata_url,
  :period,
  :portfolio,
  :primary_image,
  :primary_image_small,
  :region,
  :reign,
  :repository,
  :rights_and_reproduction,
  :river,
  :state,
  :subregion,
  :tag,
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
# @!attribute [rw] accession_number
#   @return [String, nil]
#
# @!attribute [rw] accession_year
#   @return [String, nil]
#
# @!attribute [rw] additional_image
#   @return [Array, nil]
#
# @!attribute [rw] artist_alpha_sort
#   @return [String, nil]
#
# @!attribute [rw] artist_begin_date
#   @return [String, nil]
#
# @!attribute [rw] artist_display_bio
#   @return [String, nil]
#
# @!attribute [rw] artist_display_name
#   @return [String, nil]
#
# @!attribute [rw] artist_end_date
#   @return [String, nil]
#
# @!attribute [rw] artist_gender
#   @return [String, nil]
#
# @!attribute [rw] artist_nationality
#   @return [String, nil]
#
# @!attribute [rw] artist_prefix
#   @return [String, nil]
#
# @!attribute [rw] artist_role
#   @return [String, nil]
#
# @!attribute [rw] artist_suffix
#   @return [String, nil]
#
# @!attribute [rw] artist_ulan_url
#   @return [String, nil]
#
# @!attribute [rw] artist_wikidata_url
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] constituent
#   @return [Array, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] county
#   @return [String, nil]
#
# @!attribute [rw] credit_line
#   @return [String, nil]
#
# @!attribute [rw] culture
#   @return [String, nil]
#
# @!attribute [rw] department
#   @return [String, nil]
#
# @!attribute [rw] dimension
#   @return [String, nil]
#
# @!attribute [rw] dimensions_parsed
#   @return [Array, nil]
#
# @!attribute [rw] dynasty
#   @return [String, nil]
#
# @!attribute [rw] excavation
#   @return [String, nil]
#
# @!attribute [rw] gallery_number
#   @return [String, nil]
#
# @!attribute [rw] geography_type
#   @return [String, nil]
#
# @!attribute [rw] is_highlight
#   @return [Boolean, nil]
#
# @!attribute [rw] is_public_domain
#   @return [Boolean, nil]
#
# @!attribute [rw] is_timeline_work
#   @return [Boolean, nil]
#
# @!attribute [rw] link_resource
#   @return [String, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] locus
#   @return [String, nil]
#
# @!attribute [rw] measurement
#   @return [Array, nil]
#
# @!attribute [rw] medium
#   @return [String, nil]
#
# @!attribute [rw] metadata_date
#   @return [String, nil]
#
# @!attribute [rw] object_begin_date
#   @return [Integer, nil]
#
# @!attribute [rw] object_date
#   @return [String, nil]
#
# @!attribute [rw] object_end_date
#   @return [Integer, nil]
#
# @!attribute [rw] object_i_d
#   @return [Array, nil]
#
# @!attribute [rw] object_id
#   @return [Integer, nil]
#
# @!attribute [rw] object_name
#   @return [String, nil]
#
# @!attribute [rw] object_url
#   @return [String, nil]
#
# @!attribute [rw] object_wikidata_url
#   @return [String, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] portfolio
#   @return [String, nil]
#
# @!attribute [rw] primary_image
#   @return [String, nil]
#
# @!attribute [rw] primary_image_small
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
# @!attribute [rw] rights_and_reproduction
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
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
ObjectListMatch = Struct.new(
  :accession_number,
  :accession_year,
  :additional_image,
  :artist_alpha_sort,
  :artist_begin_date,
  :artist_display_bio,
  :artist_display_name,
  :artist_end_date,
  :artist_gender,
  :artist_nationality,
  :artist_prefix,
  :artist_role,
  :artist_suffix,
  :artist_ulan_url,
  :artist_wikidata_url,
  :city,
  :classification,
  :constituent,
  :country,
  :county,
  :credit_line,
  :culture,
  :department,
  :dimension,
  :dimensions_parsed,
  :dynasty,
  :excavation,
  :gallery_number,
  :geography_type,
  :is_highlight,
  :is_public_domain,
  :is_timeline_work,
  :link_resource,
  :locale,
  :locus,
  :measurement,
  :medium,
  :metadata_date,
  :object_begin_date,
  :object_date,
  :object_end_date,
  :object_i_d,
  :object_id,
  :object_name,
  :object_url,
  :object_wikidata_url,
  :period,
  :portfolio,
  :primary_image,
  :primary_image_small,
  :region,
  :reign,
  :repository,
  :rights_and_reproduction,
  :river,
  :state,
  :subregion,
  :tag,
  :title,
  :total,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] object_i_d
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
Search = Struct.new(
  :object_i_d,
  :total,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] object_i_d
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
SearchListMatch = Struct.new(
  :object_i_d,
  :total,
  keyword_init: true
)

