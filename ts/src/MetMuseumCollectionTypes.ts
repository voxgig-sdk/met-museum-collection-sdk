// Typed models for the MetMuseumCollection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Department {
  departmentId?: number
  displayName?: string
}

export interface DepartmentListMatch {
  departmentId?: number
  displayName?: string
}

export interface Object {
  GalleryNumber?: string
  accessionNumber?: string
  accessionYear?: string
  additionalImages?: any[]
  artistAlphaSort?: string
  artistBeginDate?: string
  artistDisplayBio?: string
  artistDisplayName?: string
  artistEndDate?: string
  artistGender?: string
  artistNationality?: string
  artistPrefix?: string
  artistRole?: string
  artistSuffix?: string
  artistULAN_URL?: string
  artistWikidata_URL?: string
  city?: string
  classification?: string
  constituents?: any[]
  country?: string
  county?: string
  creditLine?: string
  culture?: string
  department?: string
  dimensions?: string
  dimensionsParsed?: any[]
  dynasty?: string
  excavation?: string
  geographyType?: string
  isHighlight?: boolean
  isPublicDomain?: boolean
  isTimelineWork?: boolean
  linkResource?: string
  locale?: string
  locus?: string
  measurements?: any[]
  medium?: string
  metadataDate?: string
  objectBeginDate?: number
  objectDate?: string
  objectEndDate?: number
  objectID?: number
  objectIDs?: any[]
  objectName?: string
  objectURL?: string
  objectWikidata_URL?: string
  period?: string
  portfolio?: string
  primaryImage?: string
  primaryImageSmall?: string
  region?: string
  reign?: string
  repository?: string
  rightsAndReproduction?: string
  river?: string
  state?: string
  subregion?: string
  tags?: any[]
  title?: string
  total?: number
}

export interface ObjectLoadMatch {
  id: number
}

export interface ObjectListMatch {
  GalleryNumber?: string
  accessionNumber?: string
  accessionYear?: string
  additionalImages?: any[]
  artistAlphaSort?: string
  artistBeginDate?: string
  artistDisplayBio?: string
  artistDisplayName?: string
  artistEndDate?: string
  artistGender?: string
  artistNationality?: string
  artistPrefix?: string
  artistRole?: string
  artistSuffix?: string
  artistULAN_URL?: string
  artistWikidata_URL?: string
  city?: string
  classification?: string
  constituents?: any[]
  country?: string
  county?: string
  creditLine?: string
  culture?: string
  department?: string
  dimensions?: string
  dimensionsParsed?: any[]
  dynasty?: string
  excavation?: string
  geographyType?: string
  isHighlight?: boolean
  isPublicDomain?: boolean
  isTimelineWork?: boolean
  linkResource?: string
  locale?: string
  locus?: string
  measurements?: any[]
  medium?: string
  metadataDate?: string
  objectBeginDate?: number
  objectDate?: string
  objectEndDate?: number
  objectID?: number
  objectIDs?: any[]
  objectName?: string
  objectURL?: string
  objectWikidata_URL?: string
  period?: string
  portfolio?: string
  primaryImage?: string
  primaryImageSmall?: string
  region?: string
  reign?: string
  repository?: string
  rightsAndReproduction?: string
  river?: string
  state?: string
  subregion?: string
  tags?: any[]
  title?: string
  total?: number
}

export interface Search {
  objectIDs?: any[]
  total?: number
}

export interface SearchListMatch {
  objectIDs?: any[]
  total?: number
}

