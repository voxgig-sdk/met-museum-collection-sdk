package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MetMuseumCollection",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://collectionapi.metmuseum.org/public/collection/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"department": map[string]any{},
				"object": map[string]any{},
				"search": map[string]any{},
			},
		},
		"entity": map[string]any{
			"department": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departmentId",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "displayName",
						"type": "`$STRING`",
					},
				},
				"name": "department",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/departments",
								"parts": []any{
									"departments",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.departments`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"object": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "GalleryNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "accessionNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "accessionYear",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "additionalImages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artistAlphaSort",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistBeginDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistDisplayBio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistDisplayName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistEndDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistGender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistNationality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistPrefix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistRole",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistSuffix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistULAN_URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistWikidata_URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "classification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "constituents",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "county",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creditLine",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "culture",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "department",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dimensions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dimensionsParsed",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dynasty",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "excavation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "geographyType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isHighlight",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isPublicDomain",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isTimelineWork",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "linkResource",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locale",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locus",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "measurements",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "medium",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadataDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectBeginDate",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "objectDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectEndDate",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "objectID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "objectIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "objectName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectURL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectWikidata_URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "period",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "portfolio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryImage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryImageSmall",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reign",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "repository",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rightsAndReproduction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "river",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subregion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"name": "object",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "1",
											"kind": "query",
											"name": "department_id",
											"orig": "department_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2018-10-22",
											"kind": "query",
											"name": "metadata_date",
											"orig": "metadata_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/objects",
								"parts": []any{
									"objects",
								},
								"select": map[string]any{
									"exist": []any{
										"department_id",
										"metadata_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objectIDs`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 45734,
											"kind": "param",
											"name": "id",
											"orig": "object_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/objects/{objectID}",
								"parts": []any{
									"objects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"objectID": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "objectIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "artist_or_culture",
											"orig": "artist_or_culture",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1800,
											"kind": "query",
											"name": "date_begin",
											"orig": "date_begin",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1900,
											"kind": "query",
											"name": "date_end",
											"orig": "date_end",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 11,
											"kind": "query",
											"name": "department_id",
											"orig": "department_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "Europe",
											"kind": "query",
											"name": "geo_location",
											"orig": "geo_location",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "has_image",
											"orig": "has_image",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "is_highlight",
											"orig": "is_highlight",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "is_on_view",
											"orig": "is_on_view",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "Paintings",
											"kind": "query",
											"name": "medium",
											"orig": "medium",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "sunflowers",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "tag",
											"orig": "tag",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"parts": []any{
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"artist_or_culture",
										"date_begin",
										"date_end",
										"department_id",
										"geo_location",
										"has_image",
										"is_highlight",
										"is_on_view",
										"medium",
										"q",
										"tag",
										"title",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objectIDs`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
