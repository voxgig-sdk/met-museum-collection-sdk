
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MetMuseumCollection',
        slug: "met-museum-collection",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://collectionapi.metmuseum.org/public/collection/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        department: {
        },
  
        object: {
        },
  
        search: {
        },
  
    }
  }


  entity = {
    "department": {
      "fields": [
        {
          "name": "departmentId",
          "short": "Unique identifier for the department",
          "type": "`$INTEGER`"
        },
        {
          "name": "displayName",
          "short": "Display name of the department",
          "type": "`$STRING`"
        }
      ],
      "name": "department",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/departments",
              "segments": [
                {
                  "lit": "departments"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.departments`"
              },
              "parts": [
                "departments"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "object": {
      "fields": [
        {
          "name": "GalleryNumber",
          "short": "Gallery number, where available",
          "type": "`$STRING`"
        },
        {
          "name": "accessionNumber",
          "short": "Identifying number for each artwork (not always unique)",
          "type": "`$STRING`"
        },
        {
          "name": "accessionYear",
          "short": "Year the artwork was acquired",
          "type": "`$STRING`"
        },
        {
          "name": "additionalImages",
          "short": "An array containing URLs to the additional images of an object in JPEG format",
          "type": "`$ARRAY`"
        },
        {
          "name": "artistAlphaSort",
          "short": "Used to sort artist names alphabetically",
          "type": "`$STRING`"
        },
        {
          "name": "artistBeginDate",
          "short": "Year the artist was born",
          "type": "`$STRING`"
        },
        {
          "name": "artistDisplayBio",
          "short": "Nationality and life dates of an artist",
          "type": "`$STRING`"
        },
        {
          "name": "artistDisplayName",
          "short": "Artist name in the correct order for display",
          "type": "`$STRING`"
        },
        {
          "name": "artistEndDate",
          "short": "Year the artist died",
          "type": "`$STRING`"
        },
        {
          "name": "artistGender",
          "short": "Gender of the artist (currently contains female designations only)",
          "type": "`$STRING`"
        },
        {
          "name": "artistNationality",
          "short": "National, geopolitical, cultural, or ethnic origins or affiliation of the creator",
          "type": "`$STRING`"
        },
        {
          "name": "artistPrefix",
          "short": "Describes the extent of creation or describes an attribution qualifier",
          "type": "`$STRING`"
        },
        {
          "name": "artistRole",
          "short": "Role of the artist related to the type of artwork or object that was created",
          "type": "`$STRING`"
        },
        {
          "name": "artistSuffix",
          "short": "Used to record complex information that qualifies the role of a constituent",
          "type": "`$STRING`"
        },
        {
          "name": "artistULAN_URL",
          "short": "ULAN URL for the artist",
          "type": "`$STRING`"
        },
        {
          "name": "artistWikidata_URL",
          "short": "Wikidata URL for the artist",
          "type": "`$STRING`"
        },
        {
          "name": "city",
          "short": "City where the artwork was created",
          "type": "`$STRING`"
        },
        {
          "name": "classification",
          "short": "General term describing the artwork type",
          "type": "`$STRING`"
        },
        {
          "name": "constituents",
          "short": "An array containing the constituents associated with an object",
          "type": "`$ARRAY`"
        },
        {
          "name": "country",
          "short": "Country where the artwork was created or found",
          "type": "`$STRING`"
        },
        {
          "name": "county",
          "short": "County where the artwork was created",
          "type": "`$STRING`"
        },
        {
          "name": "creditLine",
          "short": "Text acknowledging the source or origin of the artwork and the year the object was acquired",
          "type": "`$STRING`"
        },
        {
          "name": "culture",
          "short": "Information about the culture, or people from which an object was created",
          "type": "`$STRING`"
        },
        {
          "name": "department",
          "short": "Indicates The Met's curatorial department responsible for the artwork",
          "type": "`$STRING`"
        },
        {
          "name": "dimensions",
          "short": "Size of the artwork or object",
          "type": "`$STRING`"
        },
        {
          "name": "dimensionsParsed",
          "short": "Size of the artwork or object in centimeters, parsed",
          "type": "`$ARRAY`"
        },
        {
          "name": "dynasty",
          "short": "Dynasty under which an object was created",
          "type": "`$STRING`"
        },
        {
          "name": "excavation",
          "short": "The name of an excavation",
          "type": "`$STRING`"
        },
        {
          "name": "geographyType",
          "short": "Qualifying information that describes the relationship of the place catalogued to the object",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "isHighlight",
          "short": "When true indicates a popular and important artwork in the collection",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "isPublicDomain",
          "short": "When true indicates an artwork in the Public Domain",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "isTimelineWork",
          "short": "Whether the object is on the Timeline of Art History website",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "linkResource",
          "short": "URL to object's page on metmuseum.org",
          "type": "`$STRING`"
        },
        {
          "name": "locale",
          "short": "Geographic location more specific than subregion",
          "type": "`$STRING`"
        },
        {
          "name": "locus",
          "short": "Geographic location that is less specific than locale",
          "type": "`$STRING`"
        },
        {
          "name": "measurements",
          "short": "Array of elements with measurements.",
          "type": "`$ARRAY`"
        },
        {
          "name": "medium",
          "short": "Refers to the materials that were used to create the artwork",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "metadataDate",
          "short": "Date metadata was last updated",
          "type": "`$STRING`"
        },
        {
          "name": "objectBeginDate",
          "short": "Machine readable date indicating the year the artwork was started to be created",
          "type": "`$INTEGER`"
        },
        {
          "name": "objectDate",
          "short": "Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created",
          "type": "`$STRING`"
        },
        {
          "name": "objectEndDate",
          "short": "Machine readable date indicating the year the artwork was completed",
          "type": "`$INTEGER`"
        },
        {
          "name": "objectID",
          "short": "Identifying number for each artwork (unique, can be used as key field)",
          "type": "`$INTEGER`"
        },
        {
          "name": "objectIDs",
          "short": "An array containing the object ID of publicly-available objects",
          "type": "`$ARRAY`"
        },
        {
          "name": "objectName",
          "short": "Describes the physical type of the object",
          "type": "`$STRING`"
        },
        {
          "name": "objectURL",
          "short": "URL to object's page on metmuseum.org",
          "type": "`$STRING`"
        },
        {
          "name": "objectWikidata_URL",
          "short": "Wikidata URL for the object",
          "type": "`$STRING`"
        },
        {
          "name": "period",
          "short": "Time or time period when an object was created",
          "type": "`$STRING`"
        },
        {
          "name": "portfolio",
          "short": "A set of works created as a group or published as a series",
          "type": "`$STRING`"
        },
        {
          "name": "primaryImage",
          "short": "URL to the primary image of an object in JPEG format",
          "type": "`$STRING`"
        },
        {
          "name": "primaryImageSmall",
          "short": "URL to the lower-res primary image of an object in JPEG format",
          "type": "`$STRING`"
        },
        {
          "name": "region",
          "short": "Geographic location more specific than country",
          "type": "`$STRING`"
        },
        {
          "name": "reign",
          "short": "Reign of a monarch or ruler under which an object was created",
          "type": "`$STRING`"
        },
        {
          "name": "repository",
          "short": "Repository information",
          "type": "`$STRING`"
        },
        {
          "name": "rightsAndReproduction",
          "short": "Credit line for artworks still under copyright",
          "type": "`$STRING`"
        },
        {
          "name": "river",
          "short": "River related to the origins of an artwork",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "State or province where the artwork was created",
          "type": "`$STRING`"
        },
        {
          "name": "subregion",
          "short": "Geographic location more specific than Region",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "An array of subject keyword tags associated with the object",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "short": "Title, identifying phrase, or name given to a work of art",
          "type": "`$STRING`"
        },
        {
          "name": "total",
          "short": "The total number of publicly-available objects",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "object",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "1",
                    "kind": "query",
                    "name": "department_id",
                    "orig": "department_id",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2018-10-22",
                    "kind": "query",
                    "name": "metadata_date",
                    "orig": "metadata_date",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/objects",
              "segments": [
                {
                  "lit": "objects"
                }
              ],
              "select": {
                "exist": [
                  "department_id",
                  "metadata_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.objectIDs`"
              },
              "parts": [
                "objects"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 45734,
                    "kind": "param",
                    "name": "id",
                    "orig": "object_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/objects/{objectID}",
              "rename": {
                "param": {
                  "objectID": "id"
                }
              },
              "segments": [
                {
                  "lit": "objects"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "objects",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "objectIDs",
          "short": "An array containing the object IDs of matching objects",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "short": "The total number of objects matching the search query",
          "type": "`$INTEGER`"
        }
      ],
      "name": "search",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": true,
                    "kind": "query",
                    "name": "artist_or_culture",
                    "orig": "artist_or_culture",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1800,
                    "kind": "query",
                    "name": "date_begin",
                    "orig": "date_begin",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1900,
                    "kind": "query",
                    "name": "date_end",
                    "orig": "date_end",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 11,
                    "kind": "query",
                    "name": "department_id",
                    "orig": "department_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "Europe",
                    "kind": "query",
                    "name": "geo_location",
                    "orig": "geo_location",
                    "type": "`$STRING`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "has_image",
                    "orig": "has_image",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "is_highlight",
                    "orig": "is_highlight",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "is_on_view",
                    "orig": "is_on_view",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": "Paintings",
                    "kind": "query",
                    "name": "medium",
                    "orig": "medium",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "sunflowers",
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "select": {
                "exist": [
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
                  "title"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.objectIDs`"
              },
              "parts": [
                "search"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

