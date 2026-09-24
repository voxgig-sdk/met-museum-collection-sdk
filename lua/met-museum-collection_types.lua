-- Typed models for the MetMuseumCollection SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Department
---@field departmentId? number
---@field displayName? string

---@class DepartmentListMatch
---@field departmentId? number
---@field displayName? string

---@class Object
---@field GalleryNumber? string
---@field accessionNumber? string
---@field accessionYear? string
---@field additionalImages? table
---@field artistAlphaSort? string
---@field artistBeginDate? string
---@field artistDisplayBio? string
---@field artistDisplayName? string
---@field artistEndDate? string
---@field artistGender? string
---@field artistNationality? string
---@field artistPrefix? string
---@field artistRole? string
---@field artistSuffix? string
---@field artistULAN_URL? string
---@field artistWikidata_URL? string
---@field city? string
---@field classification? string
---@field constituents? table
---@field country? string
---@field county? string
---@field creditLine? string
---@field culture? string
---@field department? string
---@field dimensions? string
---@field dimensionsParsed? table
---@field dynasty? string
---@field excavation? string
---@field geographyType? string
---@field id? string
---@field isHighlight? boolean
---@field isPublicDomain? boolean
---@field isTimelineWork? boolean
---@field linkResource? string
---@field locale? string
---@field locus? string
---@field measurements? table
---@field medium? string
---@field metadataDate? string
---@field objectBeginDate? number
---@field objectDate? string
---@field objectEndDate? number
---@field objectID? number
---@field objectIDs? table
---@field objectName? string
---@field objectURL? string
---@field objectWikidata_URL? string
---@field period? string
---@field portfolio? string
---@field primaryImage? string
---@field primaryImageSmall? string
---@field region? string
---@field reign? string
---@field repository? string
---@field rightsAndReproduction? string
---@field river? string
---@field state? string
---@field subregion? string
---@field tags? table
---@field title? string
---@field total? number

---@class ObjectLoadMatch
---@field id number

---@class ObjectListMatch
---@field department_id? string
---@field metadata_date? string

---@class Search
---@field objectIDs? table
---@field total? number

---@class SearchListMatch
---@field artist_or_culture? boolean
---@field date_begin? number
---@field date_end? number
---@field department_id? number
---@field geo_location? string
---@field has_image? boolean
---@field is_highlight? boolean
---@field is_on_view? boolean
---@field medium? string
---@field q? string
---@field tag? boolean
---@field title? boolean

local M = {}

return M
