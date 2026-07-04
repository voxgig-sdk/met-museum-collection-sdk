// Typed models for the MetMuseumCollection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Department is the typed data model for the department entity.
type Department struct {
	DepartmentId *int `json:"department_id,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
}

// DepartmentListMatch mirrors the department fields as an all-optional match
// filter (Go analog of Partial<Department>).
type DepartmentListMatch struct {
	DepartmentId *int `json:"department_id,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
}

// Object is the typed data model for the object entity.
type Object struct {
	AccessionNumber *string `json:"accession_number,omitempty"`
	AccessionYear *string `json:"accession_year,omitempty"`
	AdditionalImage *[]any `json:"additional_image,omitempty"`
	ArtistAlphaSort *string `json:"artist_alpha_sort,omitempty"`
	ArtistBeginDate *string `json:"artist_begin_date,omitempty"`
	ArtistDisplayBio *string `json:"artist_display_bio,omitempty"`
	ArtistDisplayName *string `json:"artist_display_name,omitempty"`
	ArtistEndDate *string `json:"artist_end_date,omitempty"`
	ArtistGender *string `json:"artist_gender,omitempty"`
	ArtistNationality *string `json:"artist_nationality,omitempty"`
	ArtistPrefix *string `json:"artist_prefix,omitempty"`
	ArtistRole *string `json:"artist_role,omitempty"`
	ArtistSuffix *string `json:"artist_suffix,omitempty"`
	ArtistUlanUrl *string `json:"artist_ulan_url,omitempty"`
	ArtistWikidataUrl *string `json:"artist_wikidata_url,omitempty"`
	City *string `json:"city,omitempty"`
	Classification *string `json:"classification,omitempty"`
	Constituent *[]any `json:"constituent,omitempty"`
	Country *string `json:"country,omitempty"`
	County *string `json:"county,omitempty"`
	CreditLine *string `json:"credit_line,omitempty"`
	Culture *string `json:"culture,omitempty"`
	Department *string `json:"department,omitempty"`
	Dimension *string `json:"dimension,omitempty"`
	DimensionsParsed *[]any `json:"dimensions_parsed,omitempty"`
	Dynasty *string `json:"dynasty,omitempty"`
	Excavation *string `json:"excavation,omitempty"`
	GalleryNumber *string `json:"gallery_number,omitempty"`
	GeographyType *string `json:"geography_type,omitempty"`
	IsHighlight *bool `json:"is_highlight,omitempty"`
	IsPublicDomain *bool `json:"is_public_domain,omitempty"`
	IsTimelineWork *bool `json:"is_timeline_work,omitempty"`
	LinkResource *string `json:"link_resource,omitempty"`
	Locale *string `json:"locale,omitempty"`
	Locus *string `json:"locus,omitempty"`
	Measurement *[]any `json:"measurement,omitempty"`
	Medium *string `json:"medium,omitempty"`
	MetadataDate *string `json:"metadata_date,omitempty"`
	ObjectBeginDate *int `json:"object_begin_date,omitempty"`
	ObjectDate *string `json:"object_date,omitempty"`
	ObjectEndDate *int `json:"object_end_date,omitempty"`
	ObjectID *[]any `json:"object_i_d,omitempty"`
	ObjectId *int `json:"object_id,omitempty"`
	ObjectName *string `json:"object_name,omitempty"`
	ObjectUrl *string `json:"object_url,omitempty"`
	ObjectWikidataUrl *string `json:"object_wikidata_url,omitempty"`
	Period *string `json:"period,omitempty"`
	Portfolio *string `json:"portfolio,omitempty"`
	PrimaryImage *string `json:"primary_image,omitempty"`
	PrimaryImageSmall *string `json:"primary_image_small,omitempty"`
	Region *string `json:"region,omitempty"`
	Reign *string `json:"reign,omitempty"`
	Repository *string `json:"repository,omitempty"`
	RightsAndReproduction *string `json:"rights_and_reproduction,omitempty"`
	River *string `json:"river,omitempty"`
	State *string `json:"state,omitempty"`
	Subregion *string `json:"subregion,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
	Total *int `json:"total,omitempty"`
}

// ObjectLoadMatch is the typed request payload for Object.LoadTyped.
type ObjectLoadMatch struct {
	Id int `json:"id"`
}

// ObjectListMatch mirrors the object fields as an all-optional match
// filter (Go analog of Partial<Object>).
type ObjectListMatch struct {
	AccessionNumber *string `json:"accession_number,omitempty"`
	AccessionYear *string `json:"accession_year,omitempty"`
	AdditionalImage *[]any `json:"additional_image,omitempty"`
	ArtistAlphaSort *string `json:"artist_alpha_sort,omitempty"`
	ArtistBeginDate *string `json:"artist_begin_date,omitempty"`
	ArtistDisplayBio *string `json:"artist_display_bio,omitempty"`
	ArtistDisplayName *string `json:"artist_display_name,omitempty"`
	ArtistEndDate *string `json:"artist_end_date,omitempty"`
	ArtistGender *string `json:"artist_gender,omitempty"`
	ArtistNationality *string `json:"artist_nationality,omitempty"`
	ArtistPrefix *string `json:"artist_prefix,omitempty"`
	ArtistRole *string `json:"artist_role,omitempty"`
	ArtistSuffix *string `json:"artist_suffix,omitempty"`
	ArtistUlanUrl *string `json:"artist_ulan_url,omitempty"`
	ArtistWikidataUrl *string `json:"artist_wikidata_url,omitempty"`
	City *string `json:"city,omitempty"`
	Classification *string `json:"classification,omitempty"`
	Constituent *[]any `json:"constituent,omitempty"`
	Country *string `json:"country,omitempty"`
	County *string `json:"county,omitempty"`
	CreditLine *string `json:"credit_line,omitempty"`
	Culture *string `json:"culture,omitempty"`
	Department *string `json:"department,omitempty"`
	Dimension *string `json:"dimension,omitempty"`
	DimensionsParsed *[]any `json:"dimensions_parsed,omitempty"`
	Dynasty *string `json:"dynasty,omitempty"`
	Excavation *string `json:"excavation,omitempty"`
	GalleryNumber *string `json:"gallery_number,omitempty"`
	GeographyType *string `json:"geography_type,omitempty"`
	IsHighlight *bool `json:"is_highlight,omitempty"`
	IsPublicDomain *bool `json:"is_public_domain,omitempty"`
	IsTimelineWork *bool `json:"is_timeline_work,omitempty"`
	LinkResource *string `json:"link_resource,omitempty"`
	Locale *string `json:"locale,omitempty"`
	Locus *string `json:"locus,omitempty"`
	Measurement *[]any `json:"measurement,omitempty"`
	Medium *string `json:"medium,omitempty"`
	MetadataDate *string `json:"metadata_date,omitempty"`
	ObjectBeginDate *int `json:"object_begin_date,omitempty"`
	ObjectDate *string `json:"object_date,omitempty"`
	ObjectEndDate *int `json:"object_end_date,omitempty"`
	ObjectID *[]any `json:"object_i_d,omitempty"`
	ObjectId *int `json:"object_id,omitempty"`
	ObjectName *string `json:"object_name,omitempty"`
	ObjectUrl *string `json:"object_url,omitempty"`
	ObjectWikidataUrl *string `json:"object_wikidata_url,omitempty"`
	Period *string `json:"period,omitempty"`
	Portfolio *string `json:"portfolio,omitempty"`
	PrimaryImage *string `json:"primary_image,omitempty"`
	PrimaryImageSmall *string `json:"primary_image_small,omitempty"`
	Region *string `json:"region,omitempty"`
	Reign *string `json:"reign,omitempty"`
	Repository *string `json:"repository,omitempty"`
	RightsAndReproduction *string `json:"rights_and_reproduction,omitempty"`
	River *string `json:"river,omitempty"`
	State *string `json:"state,omitempty"`
	Subregion *string `json:"subregion,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Title *string `json:"title,omitempty"`
	Total *int `json:"total,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	ObjectID *[]any `json:"object_i_d,omitempty"`
	Total *int `json:"total,omitempty"`
}

// SearchListMatch mirrors the search fields as an all-optional match
// filter (Go analog of Partial<Search>).
type SearchListMatch struct {
	ObjectID *[]any `json:"object_i_d,omitempty"`
	Total *int `json:"total,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
