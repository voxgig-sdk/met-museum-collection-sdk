// Typed models for the MetMuseumCollection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/met-museum-collection-sdk/go/core"
)

// Department is the typed data model for the department entity.
type Department struct {
}

// DepartmentListMatch is the typed request payload for Department.ListTyped.
type DepartmentListMatch struct {
	DepartmentId *int `json:"departmentId,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
}

// Object is the typed data model for the object entity.
type Object struct {
}

// ObjectLoadMatch is the typed request payload for Object.LoadTyped.
type ObjectLoadMatch struct {
	Id int `json:"id"`
}

// ObjectListMatch is the typed request payload for Object.ListTyped.
type ObjectListMatch struct {
	DepartmentId *string `json:"department_id,omitempty"`
	MetadataDate *string `json:"metadata_date,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	ArtistOrCulture *bool `json:"artist_or_culture,omitempty"`
	DateBegin *int `json:"date_begin,omitempty"`
	DateEnd *int `json:"date_end,omitempty"`
	DepartmentId *int `json:"department_id,omitempty"`
	GeoLocation *string `json:"geo_location,omitempty"`
	HasImage *bool `json:"has_image,omitempty"`
	IsHighlight *bool `json:"is_highlight,omitempty"`
	IsOnView *bool `json:"is_on_view,omitempty"`
	Medium *string `json:"medium,omitempty"`
	Q *string `json:"q,omitempty"`
	Tag *bool `json:"tag,omitempty"`
	Title *bool `json:"title,omitempty"`
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
