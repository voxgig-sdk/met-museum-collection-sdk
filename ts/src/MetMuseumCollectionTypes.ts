// Typed models for the MetMuseumCollection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Department {
  department_id?: number
  display_name?: string
}

export type DepartmentListMatch = Partial<Department>

export interface Object {
  accession_number?: string
  accession_year?: string
  additional_image?: any[]
  artist_alpha_sort?: string
  artist_begin_date?: string
  artist_display_bio?: string
  artist_display_name?: string
  artist_end_date?: string
  artist_gender?: string
  artist_nationality?: string
  artist_prefix?: string
  artist_role?: string
  artist_suffix?: string
  artist_ulan_url?: string
  artist_wikidata_url?: string
  city?: string
  classification?: string
  constituent?: any[]
  country?: string
  county?: string
  credit_line?: string
  culture?: string
  department?: string
  dimension?: string
  dimensions_parsed?: any[]
  dynasty?: string
  excavation?: string
  gallery_number?: string
  geography_type?: string
  is_highlight?: boolean
  is_public_domain?: boolean
  is_timeline_work?: boolean
  link_resource?: string
  locale?: string
  locus?: string
  measurement?: any[]
  medium?: string
  metadata_date?: string
  object_begin_date?: number
  object_date?: string
  object_end_date?: number
  object_i_d?: any[]
  object_id?: number
  object_name?: string
  object_url?: string
  object_wikidata_url?: string
  period?: string
  portfolio?: string
  primary_image?: string
  primary_image_small?: string
  region?: string
  reign?: string
  repository?: string
  rights_and_reproduction?: string
  river?: string
  state?: string
  subregion?: string
  tag?: any[]
  title?: string
  total?: number
}

export interface ObjectLoadMatch {
  id: number
}

export type ObjectListMatch = Partial<Object>

export interface Search {
  object_i_d?: any[]
  total?: number
}

export type SearchListMatch = Partial<Search>

