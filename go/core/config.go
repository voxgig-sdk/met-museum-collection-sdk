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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Department Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the department",
					},
					map[string]any{
						"name": "displayName",
						"title": "Display Name",
						"type": "`$STRING`",
						"short": "Display name of the department",
					},
				},
				"name": "department",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/departments",
								"segments": []any{
									map[string]any{
										"lit": "departments",
									},
								},
								"parts": []any{
									"departments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.departments`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Gallery Number",
						"type": "`$STRING`",
						"short": "Gallery number, where available",
					},
					map[string]any{
						"name": "accessionNumber",
						"title": "Accession Number",
						"type": "`$STRING`",
						"short": "Identifying number for each artwork (not always unique)",
					},
					map[string]any{
						"name": "accessionYear",
						"title": "Accession Year",
						"type": "`$STRING`",
						"short": "Year the artwork was acquired",
					},
					map[string]any{
						"name": "additionalImages",
						"title": "Additional Images",
						"type": "`$ARRAY`",
						"short": "An array containing URLs to the additional images of an object in JPEG format",
					},
					map[string]any{
						"name": "artistAlphaSort",
						"title": "Artist Alpha Sort",
						"type": "`$STRING`",
						"short": "Used to sort artist names alphabetically",
					},
					map[string]any{
						"name": "artistBeginDate",
						"title": "Artist Begin Date",
						"type": "`$STRING`",
						"short": "Year the artist was born",
					},
					map[string]any{
						"name": "artistDisplayBio",
						"title": "Artist Display Bio",
						"type": "`$STRING`",
						"short": "Nationality and life dates of an artist",
					},
					map[string]any{
						"name": "artistDisplayName",
						"title": "Artist Display Name",
						"type": "`$STRING`",
						"short": "Artist name in the correct order for display",
					},
					map[string]any{
						"name": "artistEndDate",
						"title": "Artist End Date",
						"type": "`$STRING`",
						"short": "Year the artist died",
					},
					map[string]any{
						"name": "artistGender",
						"title": "Artist Gender",
						"type": "`$STRING`",
						"short": "Gender of the artist (currently contains female designations only)",
					},
					map[string]any{
						"name": "artistNationality",
						"title": "Artist Nationality",
						"type": "`$STRING`",
						"short": "National, geopolitical, cultural, or ethnic origins or affiliation of the creator",
					},
					map[string]any{
						"name": "artistPrefix",
						"title": "Artist Prefix",
						"type": "`$STRING`",
						"short": "Describes the extent of creation or describes an attribution qualifier",
					},
					map[string]any{
						"name": "artistRole",
						"title": "Artist Role",
						"type": "`$STRING`",
						"short": "Role of the artist related to the type of artwork or object that was created",
					},
					map[string]any{
						"name": "artistSuffix",
						"title": "Artist Suffix",
						"type": "`$STRING`",
						"short": "Used to record complex information that qualifies the role of a constituent",
					},
					map[string]any{
						"name": "artistULAN_URL",
						"title": "Artist Ulan Url",
						"type": "`$STRING`",
						"short": "ULAN URL for the artist",
					},
					map[string]any{
						"name": "artistWikidata_URL",
						"title": "Artist Wikidata Url",
						"type": "`$STRING`",
						"short": "Wikidata URL for the artist",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"short": "City where the artwork was created",
					},
					map[string]any{
						"name": "classification",
						"title": "Classification",
						"type": "`$STRING`",
						"short": "General term describing the artwork type",
					},
					map[string]any{
						"name": "constituents",
						"title": "Constituents",
						"type": "`$ARRAY`",
						"short": "An array containing the constituents associated with an object",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country where the artwork was created or found",
					},
					map[string]any{
						"name": "county",
						"title": "County",
						"type": "`$STRING`",
						"short": "County where the artwork was created",
					},
					map[string]any{
						"name": "creditLine",
						"title": "Credit Line",
						"type": "`$STRING`",
						"short": "Text acknowledging the source or origin of the artwork and the year the object was acquired",
					},
					map[string]any{
						"name": "culture",
						"title": "Culture",
						"type": "`$STRING`",
						"short": "Information about the culture, or people from which an object was created",
					},
					map[string]any{
						"name": "department",
						"title": "Department",
						"type": "`$STRING`",
						"short": "Indicates The Met's curatorial department responsible for the artwork",
					},
					map[string]any{
						"name": "dimensions",
						"title": "Dimensions",
						"type": "`$STRING`",
						"short": "Size of the artwork or object",
					},
					map[string]any{
						"name": "dimensionsParsed",
						"title": "Dimensions Parsed",
						"type": "`$ARRAY`",
						"short": "Size of the artwork or object in centimeters, parsed",
					},
					map[string]any{
						"name": "dynasty",
						"title": "Dynasty",
						"type": "`$STRING`",
						"short": "Dynasty under which an object was created",
					},
					map[string]any{
						"name": "excavation",
						"title": "Excavation",
						"type": "`$STRING`",
						"short": "The name of an excavation",
					},
					map[string]any{
						"name": "geographyType",
						"title": "Geography Type",
						"type": "`$STRING`",
						"short": "Qualifying information that describes the relationship of the place catalogued to the object",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isHighlight",
						"title": "Is Highlight",
						"type": "`$BOOLEAN`",
						"short": "When true indicates a popular and important artwork in the collection",
					},
					map[string]any{
						"name": "isPublicDomain",
						"title": "Is Public Domain",
						"type": "`$BOOLEAN`",
						"short": "When true indicates an artwork in the Public Domain",
					},
					map[string]any{
						"name": "isTimelineWork",
						"title": "Is Timeline Work",
						"type": "`$BOOLEAN`",
						"short": "Whether the object is on the Timeline of Art History website",
					},
					map[string]any{
						"name": "linkResource",
						"title": "Link Resource",
						"type": "`$STRING`",
						"short": "URL to object's page on metmuseum.org",
					},
					map[string]any{
						"name": "locale",
						"title": "Locale",
						"type": "`$STRING`",
						"short": "Geographic location more specific than subregion",
					},
					map[string]any{
						"name": "locus",
						"title": "Locus",
						"type": "`$STRING`",
						"short": "Geographic location that is less specific than locale",
					},
					map[string]any{
						"name": "measurements",
						"title": "Measurements",
						"type": "`$ARRAY`",
						"short": "Array of elements with measurements.",
					},
					map[string]any{
						"name": "medium",
						"title": "Medium",
						"type": "`$STRING`",
						"short": "Refers to the materials that were used to create the artwork",
					},
					map[string]any{
						"name": "metadataDate",
						"title": "Metadata Date",
						"type": "`$STRING`",
						"short": "Date metadata was last updated",
						"format": "date-time",
					},
					map[string]any{
						"name": "objectBeginDate",
						"title": "Object Begin Date",
						"type": "`$INTEGER`",
						"short": "Machine readable date indicating the year the artwork was started to be created",
					},
					map[string]any{
						"name": "objectDate",
						"title": "Object Date",
						"type": "`$STRING`",
						"short": "Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created",
					},
					map[string]any{
						"name": "objectEndDate",
						"title": "Object End Date",
						"type": "`$INTEGER`",
						"short": "Machine readable date indicating the year the artwork was completed",
					},
					map[string]any{
						"name": "objectID",
						"title": "Object Id",
						"type": "`$INTEGER`",
						"short": "Identifying number for each artwork (unique, can be used as key field)",
					},
					map[string]any{
						"name": "objectIDs",
						"title": "Object I Ds",
						"type": "`$ARRAY`",
						"short": "An array containing the object ID of publicly-available objects",
					},
					map[string]any{
						"name": "objectName",
						"title": "Object Name",
						"type": "`$STRING`",
						"short": "Describes the physical type of the object",
					},
					map[string]any{
						"name": "objectURL",
						"title": "Object Url",
						"type": "`$STRING`",
						"short": "URL to object's page on metmuseum.org",
					},
					map[string]any{
						"name": "objectWikidata_URL",
						"title": "Object Wikidata Url",
						"type": "`$STRING`",
						"short": "Wikidata URL for the object",
					},
					map[string]any{
						"name": "period",
						"title": "Period",
						"type": "`$STRING`",
						"short": "Time or time period when an object was created",
					},
					map[string]any{
						"name": "portfolio",
						"title": "Portfolio",
						"type": "`$STRING`",
						"short": "A set of works created as a group or published as a series",
					},
					map[string]any{
						"name": "primaryImage",
						"title": "Primary Image",
						"type": "`$STRING`",
						"short": "URL to the primary image of an object in JPEG format",
					},
					map[string]any{
						"name": "primaryImageSmall",
						"title": "Primary Image Small",
						"type": "`$STRING`",
						"short": "URL to the lower-res primary image of an object in JPEG format",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"short": "Geographic location more specific than country",
					},
					map[string]any{
						"name": "reign",
						"title": "Reign",
						"type": "`$STRING`",
						"short": "Reign of a monarch or ruler under which an object was created",
					},
					map[string]any{
						"name": "repository",
						"title": "Repository",
						"type": "`$STRING`",
						"short": "Repository information",
					},
					map[string]any{
						"name": "rightsAndReproduction",
						"title": "Rights And Reproduction",
						"type": "`$STRING`",
						"short": "Credit line for artworks still under copyright",
					},
					map[string]any{
						"name": "river",
						"title": "River",
						"type": "`$STRING`",
						"short": "River related to the origins of an artwork",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "State or province where the artwork was created",
					},
					map[string]any{
						"name": "subregion",
						"title": "Subregion",
						"type": "`$STRING`",
						"short": "Geographic location more specific than Region",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"short": "An array of subject keyword tags associated with the object",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Title, identifying phrase, or name given to a work of art",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$INTEGER`",
						"short": "The total number of publicly-available objects",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "object",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/objects",
								"segments": []any{
									map[string]any{
										"lit": "objects",
									},
								},
								"parts": []any{
									"objects",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objectIDs`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "department_id",
											"orig": "department_id",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1",
										},
										map[string]any{
											"name": "metadata_date",
											"orig": "metadata_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2018-10-22",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"department_id",
										"metadata_date",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/objects/{objectID}",
								"segments": []any{
									map[string]any{
										"lit": "objects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"objects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"objectID": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "object_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 45734,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Object I Ds",
						"type": "`$ARRAY`",
						"short": "An array containing the object IDs of matching objects",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$INTEGER`",
						"short": "The total number of objects matching the search query",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.objectIDs`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artist_or_culture",
											"orig": "artist_or_culture",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
										map[string]any{
											"name": "date_begin",
											"orig": "date_begin",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1800,
										},
										map[string]any{
											"name": "date_end",
											"orig": "date_end",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1900,
										},
										map[string]any{
											"name": "department_id",
											"orig": "department_id",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 11,
										},
										map[string]any{
											"name": "geo_location",
											"orig": "geo_location",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Europe",
										},
										map[string]any{
											"name": "has_image",
											"orig": "has_image",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
										map[string]any{
											"name": "is_highlight",
											"orig": "is_highlight",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
										map[string]any{
											"name": "is_on_view",
											"orig": "is_on_view",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
										map[string]any{
											"name": "medium",
											"orig": "medium",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Paintings",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"example": "sunflowers",
										},
										map[string]any{
											"name": "tag",
											"orig": "tag",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
										map[string]any{
											"name": "title",
											"orig": "title",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
