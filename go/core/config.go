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
			"slug": "met-museum-collection",
			"version": "0.0.1",
			"target": "go",
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
						"short": "Unique identifier for the department",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "displayName",
						"short": "Display name of the department",
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
						"short": "Gallery number, where available",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "accessionNumber",
						"short": "Identifying number for each artwork (not always unique)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "accessionYear",
						"short": "Year the artwork was acquired",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "additionalImages",
						"short": "An array containing URLs to the additional images of an object in JPEG format",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artistAlphaSort",
						"short": "Used to sort artist names alphabetically",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistBeginDate",
						"short": "Year the artist was born",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistDisplayBio",
						"short": "Nationality and life dates of an artist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistDisplayName",
						"short": "Artist name in the correct order for display",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistEndDate",
						"short": "Year the artist died",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistGender",
						"short": "Gender of the artist (currently contains female designations only)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistNationality",
						"short": "National, geopolitical, cultural, or ethnic origins or affiliation of the creator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistPrefix",
						"short": "Describes the extent of creation or describes an attribution qualifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistRole",
						"short": "Role of the artist related to the type of artwork or object that was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistSuffix",
						"short": "Used to record complex information that qualifies the role of a constituent",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistULAN_URL",
						"short": "ULAN URL for the artist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artistWikidata_URL",
						"short": "Wikidata URL for the artist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"short": "City where the artwork was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "classification",
						"short": "General term describing the artwork type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "constituents",
						"short": "An array containing the constituents associated with an object",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "country",
						"short": "Country where the artwork was created or found",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "county",
						"short": "County where the artwork was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creditLine",
						"short": "Text acknowledging the source or origin of the artwork and the year the object was acquired",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "culture",
						"short": "Information about the culture, or people from which an object was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "department",
						"short": "Indicates The Met's curatorial department responsible for the artwork",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dimensions",
						"short": "Size of the artwork or object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dimensionsParsed",
						"short": "Size of the artwork or object in centimeters, parsed",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "dynasty",
						"short": "Dynasty under which an object was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "excavation",
						"short": "The name of an excavation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "geographyType",
						"short": "Qualifying information that describes the relationship of the place catalogued to the object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isHighlight",
						"short": "When true indicates a popular and important artwork in the collection",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isPublicDomain",
						"short": "When true indicates an artwork in the Public Domain",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isTimelineWork",
						"short": "Whether the object is on the Timeline of Art History website",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "linkResource",
						"short": "URL to object's page on metmuseum.org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locale",
						"short": "Geographic location more specific than subregion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "locus",
						"short": "Geographic location that is less specific than locale",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "measurements",
						"short": "Array of elements with measurements.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "medium",
						"short": "Refers to the materials that were used to create the artwork",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadataDate",
						"short": "Date metadata was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectBeginDate",
						"short": "Machine readable date indicating the year the artwork was started to be created",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "objectDate",
						"short": "Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectEndDate",
						"short": "Machine readable date indicating the year the artwork was completed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "objectID",
						"short": "Identifying number for each artwork (unique, can be used as key field)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "objectIDs",
						"short": "An array containing the object ID of publicly-available objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "objectName",
						"short": "Describes the physical type of the object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectURL",
						"short": "URL to object's page on metmuseum.org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "objectWikidata_URL",
						"short": "Wikidata URL for the object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "period",
						"short": "Time or time period when an object was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "portfolio",
						"short": "A set of works created as a group or published as a series",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryImage",
						"short": "URL to the primary image of an object in JPEG format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryImageSmall",
						"short": "URL to the lower-res primary image of an object in JPEG format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"short": "Geographic location more specific than country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reign",
						"short": "Reign of a monarch or ruler under which an object was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "repository",
						"short": "Repository information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rightsAndReproduction",
						"short": "Credit line for artworks still under copyright",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "river",
						"short": "River related to the origins of an artwork",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "State or province where the artwork was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subregion",
						"short": "Geographic location more specific than Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "An array of subject keyword tags associated with the object",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"short": "Title, identifying phrase, or name given to a work of art",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"short": "The total number of publicly-available objects",
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
						"short": "An array containing the object IDs of matching objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"short": "The total number of objects matching the search query",
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
