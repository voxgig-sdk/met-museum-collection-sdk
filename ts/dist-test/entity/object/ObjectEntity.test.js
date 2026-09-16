"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ObjectEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MET_MUSEUM_COLLECTION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MetMuseumCollectionSDK.test();
        const ent = testsdk.Object();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'object.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "GalleryNumber", "req": false, "short": "Gallery number, where available", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "accessionNumber", "req": false, "short": "Identifying number for each artwork (not always unique)", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "accessionYear", "req": false, "short": "Year the artwork was acquired", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "additionalImages", "req": false, "short": "An array containing URLs to the additional images of an object in JPEG format", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "artistAlphaSort", "req": false, "short": "Used to sort artist names alphabetically", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "artistBeginDate", "req": false, "short": "Year the artist was born", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "artistDisplayBio", "req": false, "short": "Nationality and life dates of an artist", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "artistDisplayName", "req": false, "short": "Artist name in the correct order for display", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "artistEndDate", "req": false, "short": "Year the artist died", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "artistGender", "req": false, "short": "Gender of the artist (currently contains female designations only)", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "artistNationality", "req": false, "short": "National, geopolitical, cultural, or ethnic origins or affiliation of the creator", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "artistPrefix", "req": false, "short": "Describes the extent of creation or describes an attribution qualifier", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "artistRole", "req": false, "short": "Role of the artist related to the type of artwork or object that was created", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "artistSuffix", "req": false, "short": "Used to record complex information that qualifies the role of a constituent", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "artistULAN_URL", "req": false, "short": "ULAN URL for the artist", "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "artistWikidata_URL", "req": false, "short": "Wikidata URL for the artist", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "city", "req": false, "short": "City where the artwork was created", "type": "`$STRING`", "index$": 16 }, { "active": true, "name": "classification", "req": false, "short": "General term describing the artwork type", "type": "`$STRING`", "index$": 17 }, { "active": true, "name": "constituents", "req": false, "short": "An array containing the constituents associated with an object", "type": "`$ARRAY`", "index$": 18 }, { "active": true, "name": "country", "req": false, "short": "Country where the artwork was created or found", "type": "`$STRING`", "index$": 19 }, { "active": true, "name": "county", "req": false, "short": "County where the artwork was created", "type": "`$STRING`", "index$": 20 }, { "active": true, "name": "creditLine", "req": false, "short": "Text acknowledging the source or origin of the artwork and the year the object was acquired", "type": "`$STRING`", "index$": 21 }, { "active": true, "name": "culture", "req": false, "short": "Information about the culture, or people from which an object was created", "type": "`$STRING`", "index$": 22 }, { "active": true, "name": "department", "req": false, "short": "Indicates The Met's curatorial department responsible for the artwork", "type": "`$STRING`", "index$": 23 }, { "active": true, "name": "dimensions", "req": false, "short": "Size of the artwork or object", "type": "`$STRING`", "index$": 24 }, { "active": true, "name": "dimensionsParsed", "req": false, "short": "Size of the artwork or object in centimeters, parsed", "type": "`$ARRAY`", "index$": 25 }, { "active": true, "name": "dynasty", "req": false, "short": "Dynasty under which an object was created", "type": "`$STRING`", "index$": 26 }, { "active": true, "name": "excavation", "req": false, "short": "The name of an excavation", "type": "`$STRING`", "index$": 27 }, { "active": true, "name": "geographyType", "req": false, "short": "Qualifying information that describes the relationship of the place catalogued to the object", "type": "`$STRING`", "index$": 28 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 29 }, { "active": true, "name": "isHighlight", "req": false, "short": "When true indicates a popular and important artwork in the collection", "type": "`$BOOLEAN`", "index$": 30 }, { "active": true, "name": "isPublicDomain", "req": false, "short": "When true indicates an artwork in the Public Domain", "type": "`$BOOLEAN`", "index$": 31 }, { "active": true, "name": "isTimelineWork", "req": false, "short": "Whether the object is on the Timeline of Art History website", "type": "`$BOOLEAN`", "index$": 32 }, { "active": true, "name": "linkResource", "req": false, "short": "URL to object's page on metmuseum.org", "type": "`$STRING`", "index$": 33 }, { "active": true, "name": "locale", "req": false, "short": "Geographic location more specific than subregion", "type": "`$STRING`", "index$": 34 }, { "active": true, "name": "locus", "req": false, "short": "Geographic location that is less specific than locale", "type": "`$STRING`", "index$": 35 }, { "active": true, "name": "measurements", "req": false, "short": "Array of elements with measurements.", "type": "`$ARRAY`", "index$": 36 }, { "active": true, "name": "medium", "req": false, "short": "Refers to the materials that were used to create the artwork", "type": "`$STRING`", "index$": 37 }, { "active": true, "format": "date-time", "name": "metadataDate", "req": false, "short": "Date metadata was last updated", "type": "`$STRING`", "index$": 38 }, { "active": true, "name": "objectBeginDate", "req": false, "short": "Machine readable date indicating the year the artwork was started to be created", "type": "`$INTEGER`", "index$": 39 }, { "active": true, "name": "objectDate", "req": false, "short": "Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created", "type": "`$STRING`", "index$": 40 }, { "active": true, "name": "objectEndDate", "req": false, "short": "Machine readable date indicating the year the artwork was completed", "type": "`$INTEGER`", "index$": 41 }, { "active": true, "name": "objectID", "req": false, "short": "Identifying number for each artwork (unique, can be used as key field)", "type": "`$INTEGER`", "index$": 42 }, { "active": true, "name": "objectIDs", "req": false, "short": "An array containing the object ID of publicly-available objects", "type": "`$ARRAY`", "index$": 43 }, { "active": true, "name": "objectName", "req": false, "short": "Describes the physical type of the object", "type": "`$STRING`", "index$": 44 }, { "active": true, "name": "objectURL", "req": false, "short": "URL to object's page on metmuseum.org", "type": "`$STRING`", "index$": 45 }, { "active": true, "name": "objectWikidata_URL", "req": false, "short": "Wikidata URL for the object", "type": "`$STRING`", "index$": 46 }, { "active": true, "name": "period", "req": false, "short": "Time or time period when an object was created", "type": "`$STRING`", "index$": 47 }, { "active": true, "name": "portfolio", "req": false, "short": "A set of works created as a group or published as a series", "type": "`$STRING`", "index$": 48 }, { "active": true, "name": "primaryImage", "req": false, "short": "URL to the primary image of an object in JPEG format", "type": "`$STRING`", "index$": 49 }, { "active": true, "name": "primaryImageSmall", "req": false, "short": "URL to the lower-res primary image of an object in JPEG format", "type": "`$STRING`", "index$": 50 }, { "active": true, "name": "region", "req": false, "short": "Geographic location more specific than country", "type": "`$STRING`", "index$": 51 }, { "active": true, "name": "reign", "req": false, "short": "Reign of a monarch or ruler under which an object was created", "type": "`$STRING`", "index$": 52 }, { "active": true, "name": "repository", "req": false, "short": "Repository information", "type": "`$STRING`", "index$": 53 }, { "active": true, "name": "rightsAndReproduction", "req": false, "short": "Credit line for artworks still under copyright", "type": "`$STRING`", "index$": 54 }, { "active": true, "name": "river", "req": false, "short": "River related to the origins of an artwork", "type": "`$STRING`", "index$": 55 }, { "active": true, "name": "state", "req": false, "short": "State or province where the artwork was created", "type": "`$STRING`", "index$": 56 }, { "active": true, "name": "subregion", "req": false, "short": "Geographic location more specific than Region", "type": "`$STRING`", "index$": 57 }, { "active": true, "name": "tags", "req": false, "short": "An array of subject keyword tags associated with the object", "type": "`$ARRAY`", "index$": 58 }, { "active": true, "name": "title", "req": false, "short": "Title, identifying phrase, or name given to a work of art", "type": "`$STRING`", "index$": 59 }, { "active": true, "name": "total", "req": false, "short": "The total number of publicly-available objects", "type": "`$INTEGER`", "index$": 60 }], "id": { "field": "id", "name": "id" }, "name": "object", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "1", "kind": "query", "name": "department_id", "orig": "department_id", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "2018-10-22", "kind": "query", "name": "metadata_date", "orig": "metadata_date", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /objects", "json": "{\"operationId\":\"getObjects\",\"parameters\":[{\"description\":\"Returns any objects with updated data after this date (format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"metadataDate\",\"required\":false,\"schema\":{\"example\":\"2018-10-22\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Returns any objects in specific department(s). Use pipe character (|) to delimit multiple department IDs (e.g., 3|9|12)\",\"in\":\"query\",\"name\":\"departmentIds\",\"required\":false,\"schema\":{\"example\":\"1\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"objectIDs\":{\"description\":\"An array containing the object ID of publicly-available objects\",\"example\":[1,2,3,4,5,6,7,8,9,10],\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"total\":{\"description\":\"The total number of publicly-available objects\",\"example\":471581,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded (80 requests per second)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/objects", "segments": [{ "lit": "objects" }], "select": { "exist": ["department_id", "metadata_date"] }, "transform": { "req": "`reqdata`", "res": "`body.objectIDs`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 45734, "kind": "param", "name": "id", "orig": "object_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /objects/{objectID}", "json": "{\"operationId\":\"getObjectById\",\"parameters\":[{\"description\":\"The unique Object ID for an object\",\"in\":\"path\",\"name\":\"objectID\",\"required\":true,\"schema\":{\"example\":45734,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"GalleryNumber\":{\"description\":\"Gallery number, where available\",\"example\":\"131\",\"type\":\"string\"},\"accessionNumber\":{\"description\":\"Identifying number for each artwork (not always unique)\",\"example\":\"67.241\",\"type\":\"string\"},\"accessionYear\":{\"description\":\"Year the artwork was acquired\",\"example\":\"1921\",\"type\":\"string\"},\"additionalImages\":{\"description\":\"An array containing URLs to the additional images of an object in JPEG format\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"artistAlphaSort\":{\"description\":\"Used to sort artist names alphabetically\",\"example\":\"Gogh, Vincent van\",\"type\":\"string\"},\"artistBeginDate\":{\"description\":\"Year the artist was born\",\"example\":\"1840\",\"type\":\"string\"},\"artistDisplayBio\":{\"description\":\"Nationality and life dates of an artist\",\"example\":\"Dutch, Zundert 1853–1890 Auvers-sur-Oise\",\"type\":\"string\"},\"artistDisplayName\":{\"description\":\"Artist name in the correct order for display\",\"example\":\"Vincent van Gogh\",\"type\":\"string\"},\"artistEndDate\":{\"description\":\"Year the artist died\",\"example\":\"1926\",\"type\":\"string\"},\"artistGender\":{\"description\":\"Gender of the artist (currently contains female designations only)\",\"example\":\"female\",\"type\":\"string\"},\"artistNationality\":{\"description\":\"National, geopolitical, cultural, or ethnic origins or affiliation of the creator\",\"example\":\"Dutch\",\"type\":\"string\"},\"artistPrefix\":{\"description\":\"Describes the extent of creation or describes an attribution qualifier\",\"example\":\"In the Style of\",\"type\":\"string\"},\"artistRole\":{\"description\":\"Role of the artist related to the type of artwork or object that was created\",\"example\":\"Artist for Painting\",\"type\":\"string\"},\"artistSuffix\":{\"description\":\"Used to record complex information that qualifies the role of a constituent\",\"example\":\"verso only\",\"type\":\"string\"},\"artistULAN_URL\":{\"description\":\"ULAN URL for the artist\",\"example\":\"https://vocab.getty.edu/page/ulan/500003169\",\"type\":\"string\"},\"artistWikidata_URL\":{\"description\":\"Wikidata URL for the artist\",\"example\":\"https://www.wikidata.org/wiki/Q694774\",\"type\":\"string\"},\"city\":{\"description\":\"City where the artwork was created\",\"example\":\"New York\",\"type\":\"string\"},\"classification\":{\"description\":\"General term describing the artwork type\",\"example\":\"Paintings\",\"type\":\"string\"},\"constituents\":{\"description\":\"An array containing the constituents associated with an object\",\"items\":{\"properties\":{\"constituentID\":{\"type\":\"integer\"},\"constituentULAN_URL\":{\"type\":\"string\"},\"constituentWikidata_URL\":{\"type\":\"string\"},\"gender\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"role\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"country\":{\"description\":\"Country where the artwork was created or found\",\"example\":\"France\",\"type\":\"string\"},\"county\":{\"description\":\"County where the artwork was created\",\"example\":\"Orange County\",\"type\":\"string\"},\"creditLine\":{\"description\":\"Text acknowledging the source or origin of the artwork and the year the object was acquired\",\"example\":\"Robert Lehman Collection, 1975\",\"type\":\"string\"},\"culture\":{\"description\":\"Information about the culture, or people from which an object was created\",\"example\":\"British\",\"type\":\"string\"},\"department\":{\"description\":\"Indicates The Met's curatorial department responsible for the artwork\",\"example\":\"Egyptian Art\",\"type\":\"string\"},\"dimensions\":{\"description\":\"Size of the artwork or object\",\"example\":\"16 x 20 in. (40.6 x 50.8 cm)\",\"type\":\"string\"},\"dimensionsParsed\":{\"description\":\"Size of the artwork or object in centimeters, parsed\",\"items\":{\"properties\":{\"dimension\":{\"type\":\"number\"},\"dimensionType\":{\"type\":\"string\"},\"element\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"dynasty\":{\"description\":\"Dynasty under which an object was created\",\"example\":\"Kingdom of Benin\",\"type\":\"string\"},\"excavation\":{\"description\":\"The name of an excavation\",\"example\":\"MMA excavations, 1923–24\",\"type\":\"string\"},\"geographyType\":{\"description\":\"Qualifying information that describes the relationship of the place catalogued to the object\",\"example\":\"Made in\",\"type\":\"string\"},\"isHighlight\":{\"description\":\"When true indicates a popular and important artwork in the collection\",\"type\":\"boolean\"},\"isPublicDomain\":{\"description\":\"When true indicates an artwork in the Public Domain\",\"type\":\"boolean\"},\"isTimelineWork\":{\"description\":\"Whether the object is on the Timeline of Art History website\",\"type\":\"boolean\"},\"linkResource\":{\"description\":\"URL to object's page on metmuseum.org\",\"example\":\"https://www.metmuseum.org/art/collection/search/547802\",\"type\":\"string\"},\"locale\":{\"description\":\"Geographic location more specific than subregion\",\"example\":\"Tomb of Perneb\",\"type\":\"string\"},\"locus\":{\"description\":\"Geographic location that is less specific than locale\",\"example\":\"1st chamber W. wall\",\"type\":\"string\"},\"measurements\":{\"description\":\"Array of elements with measurements. Spatial measurements are in centimeters; weights are in kg\",\"items\":{\"properties\":{\"elementDescription\":{\"type\":\"string\"},\"elementMeasurements\":{\"additionalProperties\":{\"type\":\"number\"},\"type\":\"object\"},\"elementName\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"medium\":{\"description\":\"Refers to the materials that were used to create the artwork\",\"example\":\"Oil on canvas\",\"type\":\"string\"},\"metadataDate\":{\"description\":\"Date metadata was last updated\",\"example\":\"2018-10-17T10:24:43.197Z\",\"format\":\"date-time\",\"type\":\"string\"},\"objectBeginDate\":{\"description\":\"Machine readable date indicating the year the artwork was started to be created\",\"example\":1867,\"type\":\"integer\"},\"objectDate\":{\"description\":\"Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created\",\"example\":\"1865–67\",\"type\":\"string\"},\"objectEndDate\":{\"description\":\"Machine readable date indicating the year the artwork was completed\",\"example\":1888,\"type\":\"integer\"},\"objectID\":{\"description\":\"Identifying number for each artwork (unique, can be used as key field)\",\"example\":437133,\"type\":\"integer\"},\"objectName\":{\"description\":\"Describes the physical type of the object\",\"example\":\"Painting\",\"type\":\"string\"},\"objectURL\":{\"description\":\"URL to object's page on metmuseum.org\",\"example\":\"https://www.metmuseum.org/art/collection/search/547802\",\"type\":\"string\"},\"objectWikidata_URL\":{\"description\":\"Wikidata URL for the object\",\"example\":\"https://www.wikidata.org/wiki/Q432253\",\"type\":\"string\"},\"period\":{\"description\":\"Time or time period when an object was created\",\"example\":\"Ming dynasty (1368-1644)\",\"type\":\"string\"},\"portfolio\":{\"description\":\"A set of works created as a group or published as a series\",\"example\":\"Birds of America\",\"type\":\"string\"},\"primaryImage\":{\"description\":\"URL to the primary image of an object in JPEG format\",\"example\":\"https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg\",\"type\":\"string\"},\"primaryImageSmall\":{\"description\":\"URL to the lower-res primary image of an object in JPEG format\",\"example\":\"https://images.metmuseum.org/CRDImages/ep/web-large/DT1567.jpg\",\"type\":\"string\"},\"region\":{\"description\":\"Geographic location more specific than country\",\"example\":\"Bohemia\",\"type\":\"string\"},\"reign\":{\"description\":\"Reign of a monarch or ruler under which an object was created\",\"example\":\"Amenhotep III\",\"type\":\"string\"},\"repository\":{\"description\":\"Repository information\",\"example\":\"Metropolitan Museum of Art, New York, NY\",\"type\":\"string\"},\"rightsAndReproduction\":{\"description\":\"Credit line for artworks still under copyright\",\"example\":\"© 2018 Estate of Pablo Picasso / Artists Rights Society (ARS), New York\",\"type\":\"string\"},\"river\":{\"description\":\"River related to the origins of an artwork\",\"example\":\"Nile River\",\"type\":\"string\"},\"state\":{\"description\":\"State or province where the artwork was created\",\"example\":\"Brooklyn\",\"type\":\"string\"},\"subregion\":{\"description\":\"Geographic location more specific than Region\",\"example\":\"Malqata\",\"type\":\"string\"},\"tags\":{\"description\":\"An array of subject keyword tags associated with the object\",\"items\":{\"properties\":{\"AAT_URL\":{\"type\":\"string\"},\"Wikidata_URL\":{\"type\":\"string\"},\"term\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"title\":{\"description\":\"Title, identifying phrase, or name given to a work of art\",\"example\":\"Wheat Field with Cypresses\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Object not found\"},\"429\":{\"description\":\"Rate limit exceeded (80 requests per second)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/objects/{objectID}", "rename": { "param": { "objectID": "id" } }, "segments": [{ "lit": "objects" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "object", "name__orig": "object", "Name": "Object", "name_": "object", "name-": "object", "NAME": "OBJECT", "index$": 1 }, { "active": true, "entity": "object", "key$": "BasicObjectFlow", "kind": "basic", "name": "BasicObjectFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "object_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "object_ref01", "srcdatavar": "object_ref01_data", "suffix": "_dt0" }, "match": { "id": "object01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-object_ref01" } }], "index$": 1 }] }, 'Object');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let object_ref01_data = Object.values(setup.data.existing.object)[0];
        // LIST
        const object_ref01_ent = client.Object();
        const object_ref01_match = {};
        const object_ref01_list = (await object_ref01_ent.list(object_ref01_match)).map((e) => e.data());
        // LOAD
        const object_ref01_match_dt0 = {};
        object_ref01_match_dt0.id = object_ref01_data.id;
        const object_ref01_data_dt0 = (await object_ref01_ent.load(object_ref01_match_dt0)).data();
        (0, node_assert_1.default)(object_ref01_data_dt0.id === object_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/object/ObjectTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MetMuseumCollectionSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['object01', 'object02', 'object03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MET_MUSEUM_COLLECTION_TEST_OBJECT_ENTID': idmap,
        'MET_MUSEUM_COLLECTION_TEST_LIVE': 'FALSE',
        'MET_MUSEUM_COLLECTION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MET_MUSEUM_COLLECTION_TEST_OBJECT_ENTID'];
    const live = 'TRUE' === env.MET_MUSEUM_COLLECTION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MET_MUSEUM_COLLECTION_TEST_OBJECT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MetMuseumCollectionSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MET_MUSEUM_COLLECTION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ObjectEntity.test.js.map