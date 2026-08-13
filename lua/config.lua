-- MetMuseumCollection SDK configuration

local function make_config()
  return {
    main = {
      name = "MetMuseumCollection",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://collectionapi.metmuseum.org/public/collection/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["department"] = {},
        ["object"] = {},
        ["search"] = {},
      },
    },
    entity = {
      ["department"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "departmentId",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "displayName",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
        },
        ["name"] = "department",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/departments",
                ["parts"] = {
                  "departments",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.departments`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["object"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "GalleryNumber",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "accessionNumber",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "accessionYear",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "additionalImages",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "artistAlphaSort",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "artistBeginDate",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "artistDisplayBio",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "artistDisplayName",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "artistEndDate",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "artistGender",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "artistNationality",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "artistPrefix",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "artistRole",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "artistSuffix",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "artistULAN_URL",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "artistWikidata_URL",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "city",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "classification",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "constituents",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "county",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "creditLine",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 21,
          },
          {
            ["active"] = true,
            ["name"] = "culture",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 22,
          },
          {
            ["active"] = true,
            ["name"] = "department",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 23,
          },
          {
            ["active"] = true,
            ["name"] = "dimensions",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 24,
          },
          {
            ["active"] = true,
            ["name"] = "dimensionsParsed",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 25,
          },
          {
            ["active"] = true,
            ["name"] = "dynasty",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 26,
          },
          {
            ["active"] = true,
            ["name"] = "excavation",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 27,
          },
          {
            ["active"] = true,
            ["name"] = "geographyType",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 28,
          },
          {
            ["active"] = true,
            ["name"] = "isHighlight",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 29,
          },
          {
            ["active"] = true,
            ["name"] = "isPublicDomain",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 30,
          },
          {
            ["active"] = true,
            ["name"] = "isTimelineWork",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 31,
          },
          {
            ["active"] = true,
            ["name"] = "linkResource",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 32,
          },
          {
            ["active"] = true,
            ["name"] = "locale",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 33,
          },
          {
            ["active"] = true,
            ["name"] = "locus",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 34,
          },
          {
            ["active"] = true,
            ["name"] = "measurements",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 35,
          },
          {
            ["active"] = true,
            ["name"] = "medium",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 36,
          },
          {
            ["active"] = true,
            ["name"] = "metadataDate",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 37,
          },
          {
            ["active"] = true,
            ["name"] = "objectBeginDate",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 38,
          },
          {
            ["active"] = true,
            ["name"] = "objectDate",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 39,
          },
          {
            ["active"] = true,
            ["name"] = "objectEndDate",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 40,
          },
          {
            ["active"] = true,
            ["name"] = "objectID",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 41,
          },
          {
            ["active"] = true,
            ["name"] = "objectIDs",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 42,
          },
          {
            ["active"] = true,
            ["name"] = "objectName",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 43,
          },
          {
            ["active"] = true,
            ["name"] = "objectURL",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 44,
          },
          {
            ["active"] = true,
            ["name"] = "objectWikidata_URL",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 45,
          },
          {
            ["active"] = true,
            ["name"] = "period",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 46,
          },
          {
            ["active"] = true,
            ["name"] = "portfolio",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 47,
          },
          {
            ["active"] = true,
            ["name"] = "primaryImage",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 48,
          },
          {
            ["active"] = true,
            ["name"] = "primaryImageSmall",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 49,
          },
          {
            ["active"] = true,
            ["name"] = "region",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 50,
          },
          {
            ["active"] = true,
            ["name"] = "reign",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 51,
          },
          {
            ["active"] = true,
            ["name"] = "repository",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 52,
          },
          {
            ["active"] = true,
            ["name"] = "rightsAndReproduction",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 53,
          },
          {
            ["active"] = true,
            ["name"] = "river",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 54,
          },
          {
            ["active"] = true,
            ["name"] = "state",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 55,
          },
          {
            ["active"] = true,
            ["name"] = "subregion",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 56,
          },
          {
            ["active"] = true,
            ["name"] = "tags",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 57,
          },
          {
            ["active"] = true,
            ["name"] = "title",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 58,
          },
          {
            ["active"] = true,
            ["name"] = "total",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 59,
          },
        },
        ["name"] = "object",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "1",
                      ["kind"] = "query",
                      ["name"] = "department_id",
                      ["orig"] = "department_id",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "2018-10-22",
                      ["kind"] = "query",
                      ["name"] = "metadata_date",
                      ["orig"] = "metadata_date",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/objects",
                ["parts"] = {
                  "objects",
                },
                ["select"] = {
                  ["exist"] = {
                    "department_id",
                    "metadata_date",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.objectIDs`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = 45734,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "object_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/objects/{objectID}",
                ["parts"] = {
                  "objects",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["objectID"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "objectIDs",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "total",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
        },
        ["name"] = "search",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "artist_or_culture",
                      ["orig"] = "artist_or_culture",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 1800,
                      ["kind"] = "query",
                      ["name"] = "date_begin",
                      ["orig"] = "date_begin",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 1900,
                      ["kind"] = "query",
                      ["name"] = "date_end",
                      ["orig"] = "date_end",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 11,
                      ["kind"] = "query",
                      ["name"] = "department_id",
                      ["orig"] = "department_id",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "Europe",
                      ["kind"] = "query",
                      ["name"] = "geo_location",
                      ["orig"] = "geo_location",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "has_image",
                      ["orig"] = "has_image",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "is_highlight",
                      ["orig"] = "is_highlight",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "is_on_view",
                      ["orig"] = "is_on_view",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "Paintings",
                      ["kind"] = "query",
                      ["name"] = "medium",
                      ["orig"] = "medium",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "sunflowers",
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "tag",
                      ["orig"] = "tag",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "title",
                      ["orig"] = "title",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search",
                ["parts"] = {
                  "search",
                },
                ["select"] = {
                  ["exist"] = {
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.objectIDs`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
