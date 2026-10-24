import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "department",
    "accessor": "Department",
    "op": "list",
    "method": "GET",
    "path": "/departments",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "departments": [
        {
          "departmentId": 1,
          "displayName": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "object",
    "accessor": "Object",
    "op": "list",
    "method": "GET",
    "path": "/objects",
    "args": [],
    "select": {
      "department_id": "1",
      "metadata_date": "2018-10-22"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "metadataDate",
      "departmentIds"
    ],
    "queryArgs": [
      {
        "name": "department_id",
        "wire": "departmentIds"
      },
      {
        "name": "metadata_date",
        "wire": "metadataDate"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total": 471581,
      "objectIDs": [
        1,
        2,
        3
      ]
    },
    "idField": "id"
  },
  {
    "entity": "object",
    "accessor": "Object",
    "op": "load",
    "method": "GET",
    "path": "/objects/{objectID}",
    "args": [
      {
        "name": "id",
        "wire": "objectID",
        "value": 45734
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "objectID": 437133,
      "isHighlight": true,
      "accessionNumber": "67.241",
      "accessionYear": "1921",
      "isPublicDomain": true,
      "primaryImage": "https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg",
      "primaryImageSmall": "https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg",
      "additionalImages": [
        "x"
      ],
      "constituents": [
        {
          "constituentID": 1,
          "role": "x",
          "name": "x",
          "constituentULAN_URL": "x",
          "constituentWikidata_URL": "x",
          "gender": "x"
        }
      ],
      "department": "Egyptian Art",
      "objectName": "Painting",
      "title": "Wheat Field with Cypresses",
      "culture": "British",
      "period": "Ming dynasty (1368-1644)",
      "dynasty": "Kingdom of Benin",
      "reign": "Amenhotep III",
      "portfolio": "Birds of America",
      "artistRole": "Artist for Painting",
      "artistPrefix": "In the Style of",
      "artistDisplayName": "Vincent van Gogh",
      "artistDisplayBio": "Dutch, Zundert 1853–1890 Auvers-sur-Oise",
      "artistSuffix": "verso only",
      "artistAlphaSort": "Gogh, Vincent van",
      "artistNationality": "Dutch",
      "artistBeginDate": "1840",
      "artistEndDate": "1926",
      "artistGender": "female",
      "artistWikidata_URL": "https://www.wikidata.org/wiki/Q694774",
      "artistULAN_URL": "https://vocab.getty.edu/page/ulan/500003169",
      "objectDate": "1865–67",
      "objectBeginDate": 1867,
      "objectEndDate": 1888,
      "medium": "Oil on canvas",
      "dimensions": "16 x 20 in. (40.6 x 50.8 cm)",
      "dimensionsParsed": [
        {
          "element": "x",
          "dimensionType": "x",
          "dimension": 1
        }
      ],
      "measurements": [
        {
          "elementName": "x",
          "elementDescription": "x",
          "elementMeasurements": {}
        }
      ],
      "creditLine": "Robert Lehman Collection, 1975",
      "geographyType": "Made in",
      "city": "New York",
      "state": "Brooklyn",
      "county": "Orange County",
      "country": "France",
      "region": "Bohemia",
      "subregion": "Malqata",
      "locale": "Tomb of Perneb",
      "locus": "1st chamber W. wall",
      "excavation": "MMA excavations, 1923–24",
      "river": "Nile River",
      "classification": "Paintings",
      "rightsAndReproduction": "© 2018 Estate of Pablo Picasso / Artists Rights Society (ARS), New York",
      "linkResource": "https://www.metmuseum.org/art/collection/search/547802",
      "metadataDate": "2018-10-17T10:24:43.197Z",
      "repository": "Metropolitan Museum of Art, New York, NY",
      "objectURL": "https://www.metmuseum.org/art/collection/search/547802",
      "tags": [
        {
          "term": "x",
          "AAT_URL": "x",
          "Wikidata_URL": "x"
        }
      ],
      "objectWikidata_URL": "https://www.wikidata.org/wiki/Q432253",
      "isTimelineWork": true,
      "GalleryNumber": "131"
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search",
    "args": [],
    "select": {
      "artist_or_culture": "v1",
      "date_begin": 1800,
      "date_end": 1900,
      "department_id": 11,
      "geo_location": "Europe",
      "has_image": "v1",
      "is_highlight": "v1",
      "is_on_view": "v1",
      "medium": "Paintings",
      "q": "sunflowers",
      "tag": "v1",
      "title": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "title",
      "tags",
      "departmentId",
      "isHighlight",
      "isOnView",
      "artistOrCulture",
      "medium",
      "hasImages",
      "geoLocation",
      "dateBegin",
      "dateEnd"
    ],
    "queryArgs": [
      {
        "name": "artist_or_culture",
        "wire": "artistOrCulture"
      },
      {
        "name": "date_begin",
        "wire": "dateBegin"
      },
      {
        "name": "date_end",
        "wire": "dateEnd"
      },
      {
        "name": "department_id",
        "wire": "departmentId"
      },
      {
        "name": "geo_location",
        "wire": "geoLocation"
      },
      {
        "name": "has_image",
        "wire": "hasImages"
      },
      {
        "name": "is_highlight",
        "wire": "isHighlight"
      },
      {
        "name": "is_on_view",
        "wire": "isOnView"
      },
      {
        "name": "medium",
        "wire": "medium"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "tag",
        "wire": "tags"
      },
      {
        "name": "title",
        "wire": "title"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total": 1,
      "objectIDs": [
        1
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
