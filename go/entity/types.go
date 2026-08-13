// Typed models for the MetMuseumCollection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/met-museum-collection-sdk/go/core"
)

// Department is the typed data model for the department entity.
type Department struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
}

// DepartmentListMatch is the typed request payload for Department.ListTyped.
type DepartmentListMatch struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
}

// Object is the typed data model for the object entity.
type Object struct {
	GalleryNumber *string `json:"GalleryNumber,omitempty"`
	AccessionNumber *string `json:"accessionNumber,omitempty"`
	AccessionYear *string `json:"accessionYear,omitempty"`
	AdditionalImages *[]any `json:"additionalImages,omitempty"`
	ArtistAlphaSort *string `json:"artistAlphaSort,omitempty"`
	ArtistBeginDate *string `json:"artistBeginDate,omitempty"`
	ArtistDisplayBio *string `json:"artistDisplayBio,omitempty"`
	ArtistDisplayName *string `json:"artistDisplayName,omitempty"`
	ArtistEndDate *string `json:"artistEndDate,omitempty"`
	ArtistGender *string `json:"artistGender,omitempty"`
	ArtistNationality *string `json:"artistNationality,omitempty"`
	ArtistPrefix *string `json:"artistPrefix,omitempty"`
	ArtistRole *string `json:"artistRole,omitempty"`
	ArtistSuffix *string `json:"artistSuffix,omitempty"`
	ArtistULANURL *string `json:"artistULAN_URL,omitempty"`
	ArtistWikidataURL *string `json:"artistWikidata_URL,omitempty"`
	City *string `json:"city,omitempty"`
	Classification *string `json:"classification,omitempty"`
	Constituents *[]any `json:"constituents,omitempty"`
	Country *string `json:"country,omitempty"`
	County *string `json:"county,omitempty"`
	CreditLine *string `json:"creditLine,omitempty"`
	Culture *string `json:"culture,omitempty"`
	Department *string `json:"department,omitempty"`
	Dimensions *string `json:"dimensions,omitempty"`
	DimensionsParsed *[]any `json:"dimensionsParsed,omitempty"`
	Dynasty *string `json:"dynasty,omitempty"`
	Excavation *string `json:"excavation,omitempty"`
	GeographyType *string `json:"geographyType,omitempty"`
	IsHighlight *bool `json:"isHighlight,omitempty"`
	IsPublicDomain *bool `json:"isPublicDomain,omitempty"`
	IsTimelineWork *bool `json:"isTimelineWork,omitempty"`
	LinkResource *string `json:"linkResource,omitempty"`
	Locale *string `json:"locale,omitempty"`
	Locus *string `json:"locus,omitempty"`
	Measurements *[]any `json:"measurements,omitempty"`
	Medium *string `json:"medium,omitempty"`
	MetadataDate *string `json:"metadataDate,omitempty"`
	ObjectBeginDate *int `json:"objectBeginDate,omitempty"`
	ObjectDate *string `json:"objectDate,omitempty"`
	ObjectEndDate *int `json:"objectEndDate,omitempty"`
	ObjectID *int `json:"objectID,omitempty"`
	ObjectIDs *[]any `json:"objectIDs,omitempty"`
	ObjectName *string `json:"objectName,omitempty"`
	ObjectURL *string `json:"objectURL,omitempty"`
	ObjectWikidataURL *string `json:"objectWikidata_URL,omitempty"`
	Period *string `json:"period,omitempty"`
	Portfolio *string `json:"portfolio,omitempty"`
	PrimaryImage *string `json:"primaryImage,omitempty"`
	PrimaryImageSmall *string `json:"primaryImageSmall,omitempty"`
	Region *string `json:"region,omitempty"`
	Reign *string `json:"reign,omitempty"`
	Repository *string `json:"repository,omitempty"`
	RightsAndReproduction *string `json:"rightsAndReproduction,omitempty"`
	River *string `json:"river,omitempty"`
	State *string `json:"state,omitempty"`
	Subregion *string `json:"subregion,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Title *string `json:"title,omitempty"`
	Total *int `json:"total,omitempty"`
}

// ObjectLoadMatch is the typed request payload for Object.LoadTyped.
type ObjectLoadMatch struct {
	Id int `json:"id"`
}

// ObjectListMatch is the typed request payload for Object.ListTyped.
type ObjectListMatch struct {
	GalleryNumber *string `json:"GalleryNumber,omitempty"`
	AccessionNumber *string `json:"accessionNumber,omitempty"`
	AccessionYear *string `json:"accessionYear,omitempty"`
	AdditionalImages *[]any `json:"additionalImages,omitempty"`
	ArtistAlphaSort *string `json:"artistAlphaSort,omitempty"`
	ArtistBeginDate *string `json:"artistBeginDate,omitempty"`
	ArtistDisplayBio *string `json:"artistDisplayBio,omitempty"`
	ArtistDisplayName *string `json:"artistDisplayName,omitempty"`
	ArtistEndDate *string `json:"artistEndDate,omitempty"`
	ArtistGender *string `json:"artistGender,omitempty"`
	ArtistNationality *string `json:"artistNationality,omitempty"`
	ArtistPrefix *string `json:"artistPrefix,omitempty"`
	ArtistRole *string `json:"artistRole,omitempty"`
	ArtistSuffix *string `json:"artistSuffix,omitempty"`
	ArtistULANURL *string `json:"artistULAN_URL,omitempty"`
	ArtistWikidataURL *string `json:"artistWikidata_URL,omitempty"`
	City *string `json:"city,omitempty"`
	Classification *string `json:"classification,omitempty"`
	Constituents *[]any `json:"constituents,omitempty"`
	Country *string `json:"country,omitempty"`
	County *string `json:"county,omitempty"`
	CreditLine *string `json:"creditLine,omitempty"`
	Culture *string `json:"culture,omitempty"`
	Department *string `json:"department,omitempty"`
	Dimensions *string `json:"dimensions,omitempty"`
	DimensionsParsed *[]any `json:"dimensionsParsed,omitempty"`
	Dynasty *string `json:"dynasty,omitempty"`
	Excavation *string `json:"excavation,omitempty"`
	GeographyType *string `json:"geographyType,omitempty"`
	IsHighlight *bool `json:"isHighlight,omitempty"`
	IsPublicDomain *bool `json:"isPublicDomain,omitempty"`
	IsTimelineWork *bool `json:"isTimelineWork,omitempty"`
	LinkResource *string `json:"linkResource,omitempty"`
	Locale *string `json:"locale,omitempty"`
	Locus *string `json:"locus,omitempty"`
	Measurements *[]any `json:"measurements,omitempty"`
	Medium *string `json:"medium,omitempty"`
	MetadataDate *string `json:"metadataDate,omitempty"`
	ObjectBeginDate *int `json:"objectBeginDate,omitempty"`
	ObjectDate *string `json:"objectDate,omitempty"`
	ObjectEndDate *int `json:"objectEndDate,omitempty"`
	ObjectID *int `json:"objectID,omitempty"`
	ObjectIDs *[]any `json:"objectIDs,omitempty"`
	ObjectName *string `json:"objectName,omitempty"`
	ObjectURL *string `json:"objectURL,omitempty"`
	ObjectWikidataURL *string `json:"objectWikidata_URL,omitempty"`
	Period *string `json:"period,omitempty"`
	Portfolio *string `json:"portfolio,omitempty"`
	PrimaryImage *string `json:"primaryImage,omitempty"`
	PrimaryImageSmall *string `json:"primaryImageSmall,omitempty"`
	Region *string `json:"region,omitempty"`
	Reign *string `json:"reign,omitempty"`
	Repository *string `json:"repository,omitempty"`
	RightsAndReproduction *string `json:"rightsAndReproduction,omitempty"`
	River *string `json:"river,omitempty"`
	State *string `json:"state,omitempty"`
	Subregion *string `json:"subregion,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Title *string `json:"title,omitempty"`
	Total *int `json:"total,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	ObjectIDs *[]any `json:"objectIDs,omitempty"`
	Total *int `json:"total,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	ObjectIDs *[]any `json:"objectIDs,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
