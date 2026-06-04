
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://collectionapi.metmuseum.org/public/collection/v1',

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
          "name": "department_id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "display_name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "department",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/departments",
              "parts": [
                "departments"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "object": {
      "fields": [
        {
          "name": "accession_number",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "accession_year",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "additional_image",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "artist_alpha_sort",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "artist_begin_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "artist_display_bio",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "artist_display_name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "artist_end_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "artist_gender",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "artist_nationality",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "artist_prefix",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "artist_role",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "artist_suffix",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "artist_ulan_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "artist_wikidata_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "city",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 15
        },
        {
          "name": "classification",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        },
        {
          "name": "constituent",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 17
        },
        {
          "name": "country",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 18
        },
        {
          "name": "county",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 19
        },
        {
          "name": "credit_line",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 20
        },
        {
          "name": "culture",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 21
        },
        {
          "name": "department",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 22
        },
        {
          "name": "dimension",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 23
        },
        {
          "name": "dimensions_parsed",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 24
        },
        {
          "name": "dynasty",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 25
        },
        {
          "name": "excavation",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 26
        },
        {
          "name": "gallery_number",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "geography_type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 28
        },
        {
          "name": "is_highlight",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 29
        },
        {
          "name": "is_public_domain",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 30
        },
        {
          "name": "is_timeline_work",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 31
        },
        {
          "name": "link_resource",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 32
        },
        {
          "name": "locale",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 33
        },
        {
          "name": "locus",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 34
        },
        {
          "name": "measurement",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 35
        },
        {
          "name": "medium",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 36
        },
        {
          "name": "metadata_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 37
        },
        {
          "name": "object_begin_date",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 38
        },
        {
          "name": "object_date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 39
        },
        {
          "name": "object_end_date",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 40
        },
        {
          "name": "object_i_d",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 41
        },
        {
          "name": "object_id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 42
        },
        {
          "name": "object_name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 43
        },
        {
          "name": "object_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 44
        },
        {
          "name": "object_wikidata_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 45
        },
        {
          "name": "period",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 46
        },
        {
          "name": "portfolio",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 47
        },
        {
          "name": "primary_image",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 48
        },
        {
          "name": "primary_image_small",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 49
        },
        {
          "name": "region",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 50
        },
        {
          "name": "reign",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 51
        },
        {
          "name": "repository",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 52
        },
        {
          "name": "rights_and_reproduction",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 53
        },
        {
          "name": "river",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 54
        },
        {
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 55
        },
        {
          "name": "subregion",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 56
        },
        {
          "name": "tag",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 57
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 58
        },
        {
          "name": "total",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 59
        }
      ],
      "name": "object",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "2018-10-22",
                    "kind": "query",
                    "name": "metadata_date",
                    "orig": "metadata_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/objects",
              "parts": [
                "objects"
              ],
              "select": {
                "exist": [
                  "department_id",
                  "metadata_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/objects/{objectID}",
              "parts": [
                "objects",
                "{id}"
              ],
              "rename": {
                "param": {
                  "objectID": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "object_i_d",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "total",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "search",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 1800,
                    "kind": "query",
                    "name": "date_begin",
                    "orig": "date_begin",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 1900,
                    "kind": "query",
                    "name": "date_end",
                    "orig": "date_end",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 11,
                    "kind": "query",
                    "name": "department_id",
                    "orig": "department_id",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "Europe",
                    "kind": "query",
                    "name": "geo_location",
                    "orig": "geo_location",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "has_image",
                    "orig": "has_image",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "is_highlight",
                    "orig": "is_highlight",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "is_on_view",
                    "orig": "is_on_view",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": "Paintings",
                    "kind": "query",
                    "name": "medium",
                    "orig": "medium",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "sunflowers",
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search",
              "parts": [
                "search"
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
  config
}

