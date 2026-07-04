-- ProjectName SDK configuration

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
            ["name"] = "department_id",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "display_name",
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
                ["method"] = "GET",
                ["orig"] = "/departments",
                ["parts"] = {
                  "departments",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
            ["name"] = "accession_number",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "accession_year",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "additional_image",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "artist_alpha_sort",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "artist_begin_date",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "artist_display_bio",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "artist_display_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "artist_end_date",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "artist_gender",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "artist_nationality",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "artist_prefix",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "artist_role",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "artist_suffix",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "artist_ulan_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "artist_wikidata_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "city",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "classification",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "constituent",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "county",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "credit_line",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "culture",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 21,
          },
          {
            ["active"] = true,
            ["name"] = "department",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 22,
          },
          {
            ["active"] = true,
            ["name"] = "dimension",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 23,
          },
          {
            ["active"] = true,
            ["name"] = "dimensions_parsed",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 24,
          },
          {
            ["active"] = true,
            ["name"] = "dynasty",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 25,
          },
          {
            ["active"] = true,
            ["name"] = "excavation",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 26,
          },
          {
            ["active"] = true,
            ["name"] = "gallery_number",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 27,
          },
          {
            ["active"] = true,
            ["name"] = "geography_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 28,
          },
          {
            ["active"] = true,
            ["name"] = "is_highlight",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 29,
          },
          {
            ["active"] = true,
            ["name"] = "is_public_domain",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 30,
          },
          {
            ["active"] = true,
            ["name"] = "is_timeline_work",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 31,
          },
          {
            ["active"] = true,
            ["name"] = "link_resource",
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
            ["name"] = "measurement",
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
            ["name"] = "metadata_date",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 37,
          },
          {
            ["active"] = true,
            ["name"] = "object_begin_date",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 38,
          },
          {
            ["active"] = true,
            ["name"] = "object_date",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 39,
          },
          {
            ["active"] = true,
            ["name"] = "object_end_date",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 40,
          },
          {
            ["active"] = true,
            ["name"] = "object_i_d",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 41,
          },
          {
            ["active"] = true,
            ["name"] = "object_id",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 42,
          },
          {
            ["active"] = true,
            ["name"] = "object_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 43,
          },
          {
            ["active"] = true,
            ["name"] = "object_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 44,
          },
          {
            ["active"] = true,
            ["name"] = "object_wikidata_url",
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
            ["name"] = "primary_image",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 48,
          },
          {
            ["active"] = true,
            ["name"] = "primary_image_small",
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
            ["name"] = "rights_and_reproduction",
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
            ["name"] = "tag",
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
                  ["res"] = "`body`",
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
            ["name"] = "object_i_d",
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
                  ["res"] = "`body`",
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
