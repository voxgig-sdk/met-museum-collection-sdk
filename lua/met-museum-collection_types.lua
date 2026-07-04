-- Typed models for the MetMuseumCollection SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Department
---@field department_id? number
---@field display_name? string

---@class DepartmentListMatch

---@class Object
---@field accession_number? string
---@field accession_year? string
---@field additional_image? table
---@field artist_alpha_sort? string
---@field artist_begin_date? string
---@field artist_display_bio? string
---@field artist_display_name? string
---@field artist_end_date? string
---@field artist_gender? string
---@field artist_nationality? string
---@field artist_prefix? string
---@field artist_role? string
---@field artist_suffix? string
---@field artist_ulan_url? string
---@field artist_wikidata_url? string
---@field city? string
---@field classification? string
---@field constituent? table
---@field country? string
---@field county? string
---@field credit_line? string
---@field culture? string
---@field department? string
---@field dimension? string
---@field dimensions_parsed? table
---@field dynasty? string
---@field excavation? string
---@field gallery_number? string
---@field geography_type? string
---@field is_highlight? boolean
---@field is_public_domain? boolean
---@field is_timeline_work? boolean
---@field link_resource? string
---@field locale? string
---@field locus? string
---@field measurement? table
---@field medium? string
---@field metadata_date? string
---@field object_begin_date? number
---@field object_date? string
---@field object_end_date? number
---@field object_i_d? table
---@field object_id? number
---@field object_name? string
---@field object_url? string
---@field object_wikidata_url? string
---@field period? string
---@field portfolio? string
---@field primary_image? string
---@field primary_image_small? string
---@field region? string
---@field reign? string
---@field repository? string
---@field rights_and_reproduction? string
---@field river? string
---@field state? string
---@field subregion? string
---@field tag? table
---@field title? string
---@field total? number

---@class ObjectLoadMatch
---@field id number

---@class ObjectListMatch

---@class Search
---@field object_i_d? table
---@field total? number

---@class SearchListMatch

local M = {}

return M
