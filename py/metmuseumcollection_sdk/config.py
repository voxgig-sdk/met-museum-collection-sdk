# MetMuseumCollection SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MetMuseumCollection",
            "slug": "met-museum-collection",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://collectionapi.metmuseum.org/public/collection/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "department": {},
                "object": {},
                "search": {},
            },
        },
        "entity": {
      "department": {
        "fields": [
          {
            "name": "departmentId",
            "title": "Department Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the department",
          },
          {
            "name": "displayName",
            "title": "Display Name",
            "type": "`$STRING`",
            "short": "Display name of the department",
          },
        ],
        "name": "department",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/departments",
                "segments": [
                  {
                    "lit": "departments",
                  },
                ],
                "parts": [
                  "departments",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.departments`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "object": {
        "fields": [
          {
            "name": "GalleryNumber",
            "title": "Gallery Number",
            "type": "`$STRING`",
            "short": "Gallery number, where available",
          },
          {
            "name": "accessionNumber",
            "title": "Accession Number",
            "type": "`$STRING`",
            "short": "Identifying number for each artwork (not always unique)",
          },
          {
            "name": "accessionYear",
            "title": "Accession Year",
            "type": "`$STRING`",
            "short": "Year the artwork was acquired",
          },
          {
            "name": "additionalImages",
            "title": "Additional Images",
            "type": "`$ARRAY`",
            "short": "An array containing URLs to the additional images of an object in JPEG format",
          },
          {
            "name": "artistAlphaSort",
            "title": "Artist Alpha Sort",
            "type": "`$STRING`",
            "short": "Used to sort artist names alphabetically",
          },
          {
            "name": "artistBeginDate",
            "title": "Artist Begin Date",
            "type": "`$STRING`",
            "short": "Year the artist was born",
          },
          {
            "name": "artistDisplayBio",
            "title": "Artist Display Bio",
            "type": "`$STRING`",
            "short": "Nationality and life dates of an artist",
          },
          {
            "name": "artistDisplayName",
            "title": "Artist Display Name",
            "type": "`$STRING`",
            "short": "Artist name in the correct order for display",
          },
          {
            "name": "artistEndDate",
            "title": "Artist End Date",
            "type": "`$STRING`",
            "short": "Year the artist died",
          },
          {
            "name": "artistGender",
            "title": "Artist Gender",
            "type": "`$STRING`",
            "short": "Gender of the artist (currently contains female designations only)",
          },
          {
            "name": "artistNationality",
            "title": "Artist Nationality",
            "type": "`$STRING`",
            "short": "National, geopolitical, cultural, or ethnic origins or affiliation of the creator",
          },
          {
            "name": "artistPrefix",
            "title": "Artist Prefix",
            "type": "`$STRING`",
            "short": "Describes the extent of creation or describes an attribution qualifier",
          },
          {
            "name": "artistRole",
            "title": "Artist Role",
            "type": "`$STRING`",
            "short": "Role of the artist related to the type of artwork or object that was created",
          },
          {
            "name": "artistSuffix",
            "title": "Artist Suffix",
            "type": "`$STRING`",
            "short": "Used to record complex information that qualifies the role of a constituent",
          },
          {
            "name": "artistULAN_URL",
            "title": "Artist Ulan Url",
            "type": "`$STRING`",
            "short": "ULAN URL for the artist",
          },
          {
            "name": "artistWikidata_URL",
            "title": "Artist Wikidata Url",
            "type": "`$STRING`",
            "short": "Wikidata URL for the artist",
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "short": "City where the artwork was created",
          },
          {
            "name": "classification",
            "title": "Classification",
            "type": "`$STRING`",
            "short": "General term describing the artwork type",
          },
          {
            "name": "constituents",
            "title": "Constituents",
            "type": "`$ARRAY`",
            "short": "An array containing the constituents associated with an object",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "short": "Country where the artwork was created or found",
          },
          {
            "name": "county",
            "title": "County",
            "type": "`$STRING`",
            "short": "County where the artwork was created",
          },
          {
            "name": "creditLine",
            "title": "Credit Line",
            "type": "`$STRING`",
            "short": "Text acknowledging the source or origin of the artwork and the year the object was acquired",
          },
          {
            "name": "culture",
            "title": "Culture",
            "type": "`$STRING`",
            "short": "Information about the culture, or people from which an object was created",
          },
          {
            "name": "department",
            "title": "Department",
            "type": "`$STRING`",
            "short": "Indicates The Met's curatorial department responsible for the artwork",
          },
          {
            "name": "dimensions",
            "title": "Dimensions",
            "type": "`$STRING`",
            "short": "Size of the artwork or object",
          },
          {
            "name": "dimensionsParsed",
            "title": "Dimensions Parsed",
            "type": "`$ARRAY`",
            "short": "Size of the artwork or object in centimeters, parsed",
          },
          {
            "name": "dynasty",
            "title": "Dynasty",
            "type": "`$STRING`",
            "short": "Dynasty under which an object was created",
          },
          {
            "name": "excavation",
            "title": "Excavation",
            "type": "`$STRING`",
            "short": "The name of an excavation",
          },
          {
            "name": "geographyType",
            "title": "Geography Type",
            "type": "`$STRING`",
            "short": "Qualifying information that describes the relationship of the place catalogued to the object",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "isHighlight",
            "title": "Is Highlight",
            "type": "`$BOOLEAN`",
            "short": "When true indicates a popular and important artwork in the collection",
          },
          {
            "name": "isPublicDomain",
            "title": "Is Public Domain",
            "type": "`$BOOLEAN`",
            "short": "When true indicates an artwork in the Public Domain",
          },
          {
            "name": "isTimelineWork",
            "title": "Is Timeline Work",
            "type": "`$BOOLEAN`",
            "short": "Whether the object is on the Timeline of Art History website",
          },
          {
            "name": "linkResource",
            "title": "Link Resource",
            "type": "`$STRING`",
            "short": "URL to object's page on metmuseum.org",
          },
          {
            "name": "locale",
            "title": "Locale",
            "type": "`$STRING`",
            "short": "Geographic location more specific than subregion",
          },
          {
            "name": "locus",
            "title": "Locus",
            "type": "`$STRING`",
            "short": "Geographic location that is less specific than locale",
          },
          {
            "name": "measurements",
            "title": "Measurements",
            "type": "`$ARRAY`",
            "short": "Array of elements with measurements.",
          },
          {
            "name": "medium",
            "title": "Medium",
            "type": "`$STRING`",
            "short": "Refers to the materials that were used to create the artwork",
          },
          {
            "name": "metadataDate",
            "title": "Metadata Date",
            "type": "`$STRING`",
            "short": "Date metadata was last updated",
            "format": "date-time",
          },
          {
            "name": "objectBeginDate",
            "title": "Object Begin Date",
            "type": "`$INTEGER`",
            "short": "Machine readable date indicating the year the artwork was started to be created",
          },
          {
            "name": "objectDate",
            "title": "Object Date",
            "type": "`$STRING`",
            "short": "Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created",
          },
          {
            "name": "objectEndDate",
            "title": "Object End Date",
            "type": "`$INTEGER`",
            "short": "Machine readable date indicating the year the artwork was completed",
          },
          {
            "name": "objectID",
            "title": "Object Id",
            "type": "`$INTEGER`",
            "short": "Identifying number for each artwork (unique, can be used as key field)",
          },
          {
            "name": "objectIDs",
            "title": "Object I Ds",
            "type": "`$ARRAY`",
            "short": "An array containing the object ID of publicly-available objects",
          },
          {
            "name": "objectName",
            "title": "Object Name",
            "type": "`$STRING`",
            "short": "Describes the physical type of the object",
          },
          {
            "name": "objectURL",
            "title": "Object Url",
            "type": "`$STRING`",
            "short": "URL to object's page on metmuseum.org",
          },
          {
            "name": "objectWikidata_URL",
            "title": "Object Wikidata Url",
            "type": "`$STRING`",
            "short": "Wikidata URL for the object",
          },
          {
            "name": "period",
            "title": "Period",
            "type": "`$STRING`",
            "short": "Time or time period when an object was created",
          },
          {
            "name": "portfolio",
            "title": "Portfolio",
            "type": "`$STRING`",
            "short": "A set of works created as a group or published as a series",
          },
          {
            "name": "primaryImage",
            "title": "Primary Image",
            "type": "`$STRING`",
            "short": "URL to the primary image of an object in JPEG format",
          },
          {
            "name": "primaryImageSmall",
            "title": "Primary Image Small",
            "type": "`$STRING`",
            "short": "URL to the lower-res primary image of an object in JPEG format",
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
            "short": "Geographic location more specific than country",
          },
          {
            "name": "reign",
            "title": "Reign",
            "type": "`$STRING`",
            "short": "Reign of a monarch or ruler under which an object was created",
          },
          {
            "name": "repository",
            "title": "Repository",
            "type": "`$STRING`",
            "short": "Repository information",
          },
          {
            "name": "rightsAndReproduction",
            "title": "Rights And Reproduction",
            "type": "`$STRING`",
            "short": "Credit line for artworks still under copyright",
          },
          {
            "name": "river",
            "title": "River",
            "type": "`$STRING`",
            "short": "River related to the origins of an artwork",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "short": "State or province where the artwork was created",
          },
          {
            "name": "subregion",
            "title": "Subregion",
            "type": "`$STRING`",
            "short": "Geographic location more specific than Region",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "An array of subject keyword tags associated with the object",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Title, identifying phrase, or name given to a work of art",
          },
          {
            "name": "total",
            "title": "Total",
            "type": "`$INTEGER`",
            "short": "The total number of publicly-available objects",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "object",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/objects",
                "segments": [
                  {
                    "lit": "objects",
                  },
                ],
                "parts": [
                  "objects",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.objectIDs`",
                },
                "args": {
                  "query": [
                    {
                      "name": "department_id",
                      "orig": "department_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "1",
                    },
                    {
                      "name": "metadata_date",
                      "orig": "metadata_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2018-10-22",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "department_id",
                    "metadata_date",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/objects/{objectID}",
                "segments": [
                  {
                    "lit": "objects",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "objects",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "objectID": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "object_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 45734,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "objectIDs",
            "title": "Object I Ds",
            "type": "`$ARRAY`",
            "short": "An array containing the object IDs of matching objects",
          },
          {
            "name": "total",
            "title": "Total",
            "type": "`$INTEGER`",
            "short": "The total number of objects matching the search query",
          },
        ],
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.objectIDs`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artist_or_culture",
                      "orig": "artist_or_culture",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": True,
                    },
                    {
                      "name": "date_begin",
                      "orig": "date_begin",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1800,
                    },
                    {
                      "name": "date_end",
                      "orig": "date_end",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1900,
                    },
                    {
                      "name": "department_id",
                      "orig": "department_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 11,
                    },
                    {
                      "name": "geo_location",
                      "orig": "geo_location",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Europe",
                    },
                    {
                      "name": "has_image",
                      "orig": "has_image",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": True,
                    },
                    {
                      "name": "is_highlight",
                      "orig": "is_highlight",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": True,
                    },
                    {
                      "name": "is_on_view",
                      "orig": "is_on_view",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": True,
                    },
                    {
                      "name": "medium",
                      "orig": "medium",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Paintings",
                    },
                    {
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "sunflowers",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": True,
                    },
                    {
                      "name": "title",
                      "orig": "title",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": True,
                    },
                  ],
                },
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
                    "title",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
