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
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('object hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.MetMuseumCollectionSDK.test(offline).Object().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.MetMuseumCollectionSDK.test(offline).Object()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.MetMuseumCollectionSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Object().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.MetMuseumCollectionSDK.test().Object().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.MetMuseumCollectionSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Object().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Object().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.MetMuseumCollectionSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Object().list({ "department_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'object.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "GalleryNumber": { "a": true, "h": "Gallery Number", "n": "GalleryNumber", "r": false, "sh": "Gallery number, where available", "t": "`$STRING`", "key$": "GalleryNumber", "index$": 0 }, "accessionNumber": { "a": true, "h": "Accession Number", "n": "accessionNumber", "r": false, "sh": "Identifying number for each artwork (not always unique)", "t": "`$STRING`", "key$": "accessionNumber", "index$": 1 }, "accessionYear": { "a": true, "h": "Accession Year", "n": "accessionYear", "r": false, "sh": "Year the artwork was acquired", "t": "`$STRING`", "key$": "accessionYear", "index$": 2 }, "additionalImages": { "a": true, "h": "Additional Images", "n": "additionalImages", "r": false, "sh": "An array containing URLs to the additional images of an object in JPEG format", "t": "`$ARRAY`", "key$": "additionalImages", "index$": 3 }, "artistAlphaSort": { "a": true, "h": "Artist Alpha Sort", "n": "artistAlphaSort", "r": false, "sh": "Used to sort artist names alphabetically", "t": "`$STRING`", "key$": "artistAlphaSort", "index$": 4 }, "artistBeginDate": { "a": true, "h": "Artist Begin Date", "n": "artistBeginDate", "r": false, "sh": "Year the artist was born", "t": "`$STRING`", "key$": "artistBeginDate", "index$": 5 }, "artistDisplayBio": { "a": true, "h": "Artist Display Bio", "n": "artistDisplayBio", "r": false, "sh": "Nationality and life dates of an artist", "t": "`$STRING`", "key$": "artistDisplayBio", "index$": 6 }, "artistDisplayName": { "a": true, "h": "Artist Display Name", "n": "artistDisplayName", "r": false, "sh": "Artist name in the correct order for display", "t": "`$STRING`", "key$": "artistDisplayName", "index$": 7 }, "artistEndDate": { "a": true, "h": "Artist End Date", "n": "artistEndDate", "r": false, "sh": "Year the artist died", "t": "`$STRING`", "key$": "artistEndDate", "index$": 8 }, "artistGender": { "a": true, "h": "Artist Gender", "n": "artistGender", "r": false, "sh": "Gender of the artist (currently contains female designations only)", "t": "`$STRING`", "key$": "artistGender", "index$": 9 }, "artistNationality": { "a": true, "h": "Artist Nationality", "n": "artistNationality", "r": false, "sh": "National, geopolitical, cultural, or ethnic origins or affiliation of the creator", "t": "`$STRING`", "key$": "artistNationality", "index$": 10 }, "artistPrefix": { "a": true, "h": "Artist Prefix", "n": "artistPrefix", "r": false, "sh": "Describes the extent of creation or describes an attribution qualifier", "t": "`$STRING`", "key$": "artistPrefix", "index$": 11 }, "artistRole": { "a": true, "h": "Artist Role", "n": "artistRole", "r": false, "sh": "Role of the artist related to the type of artwork or object that was created", "t": "`$STRING`", "key$": "artistRole", "index$": 12 }, "artistSuffix": { "a": true, "h": "Artist Suffix", "n": "artistSuffix", "r": false, "sh": "Used to record complex information that qualifies the role of a constituent", "t": "`$STRING`", "key$": "artistSuffix", "index$": 13 }, "artistULAN_URL": { "a": true, "h": "Artist Ulan Url", "n": "artistULAN_URL", "r": false, "sh": "ULAN URL for the artist", "t": "`$STRING`", "key$": "artistULAN_URL", "index$": 14 }, "artistWikidata_URL": { "a": true, "h": "Artist Wikidata Url", "n": "artistWikidata_URL", "r": false, "sh": "Wikidata URL for the artist", "t": "`$STRING`", "key$": "artistWikidata_URL", "index$": 15 }, "city": { "a": true, "h": "City", "n": "city", "r": false, "sh": "City where the artwork was created", "t": "`$STRING`", "key$": "city", "index$": 16 }, "classification": { "a": true, "h": "Classification", "n": "classification", "r": false, "sh": "General term describing the artwork type", "t": "`$STRING`", "key$": "classification", "index$": 17 }, "constituents": { "a": true, "h": "Constituents", "n": "constituents", "r": false, "sh": "An array containing the constituents associated with an object", "t": "`$ARRAY`", "key$": "constituents", "index$": 18 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "sh": "Country where the artwork was created or found", "t": "`$STRING`", "key$": "country", "index$": 19 }, "county": { "a": true, "h": "County", "n": "county", "r": false, "sh": "County where the artwork was created", "t": "`$STRING`", "key$": "county", "index$": 20 }, "creditLine": { "a": true, "h": "Credit Line", "n": "creditLine", "r": false, "sh": "Text acknowledging the source or origin of the artwork and the year the object was acquired", "t": "`$STRING`", "key$": "creditLine", "index$": 21 }, "culture": { "a": true, "h": "Culture", "n": "culture", "r": false, "sh": "Information about the culture, or people from which an object was created", "t": "`$STRING`", "key$": "culture", "index$": 22 }, "department": { "a": true, "h": "Department", "n": "department", "r": false, "sh": "Indicates The Met's curatorial department responsible for the artwork", "t": "`$STRING`", "key$": "department", "index$": 23 }, "dimensions": { "a": true, "h": "Dimensions", "n": "dimensions", "r": false, "sh": "Size of the artwork or object", "t": "`$STRING`", "key$": "dimensions", "index$": 24 }, "dimensionsParsed": { "a": true, "h": "Dimensions Parsed", "n": "dimensionsParsed", "r": false, "sh": "Size of the artwork or object in centimeters, parsed", "t": "`$ARRAY`", "key$": "dimensionsParsed", "index$": 25 }, "dynasty": { "a": true, "h": "Dynasty", "n": "dynasty", "r": false, "sh": "Dynasty under which an object was created", "t": "`$STRING`", "key$": "dynasty", "index$": 26 }, "excavation": { "a": true, "h": "Excavation", "n": "excavation", "r": false, "sh": "The name of an excavation", "t": "`$STRING`", "key$": "excavation", "index$": 27 }, "geographyType": { "a": true, "h": "Geography Type", "n": "geographyType", "r": false, "sh": "Qualifying information that describes the relationship of the place catalogued to the object", "t": "`$STRING`", "key$": "geographyType", "index$": 28 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 29 }, "isHighlight": { "a": true, "h": "Is Highlight", "n": "isHighlight", "r": false, "sh": "When true indicates a popular and important artwork in the collection", "t": "`$BOOLEAN`", "key$": "isHighlight", "index$": 30 }, "isPublicDomain": { "a": true, "h": "Is Public Domain", "n": "isPublicDomain", "r": false, "sh": "When true indicates an artwork in the Public Domain", "t": "`$BOOLEAN`", "key$": "isPublicDomain", "index$": 31 }, "isTimelineWork": { "a": true, "h": "Is Timeline Work", "n": "isTimelineWork", "r": false, "sh": "Whether the object is on the Timeline of Art History website", "t": "`$BOOLEAN`", "key$": "isTimelineWork", "index$": 32 }, "linkResource": { "a": true, "h": "Link Resource", "n": "linkResource", "r": false, "sh": "URL to object's page on metmuseum.org", "t": "`$STRING`", "key$": "linkResource", "index$": 33 }, "locale": { "a": true, "h": "Locale", "n": "locale", "r": false, "sh": "Geographic location more specific than subregion", "t": "`$STRING`", "key$": "locale", "index$": 34 }, "locus": { "a": true, "h": "Locus", "n": "locus", "r": false, "sh": "Geographic location that is less specific than locale", "t": "`$STRING`", "key$": "locus", "index$": 35 }, "measurements": { "a": true, "h": "Measurements", "n": "measurements", "r": false, "sh": "Array of elements with measurements.", "t": "`$ARRAY`", "key$": "measurements", "index$": 36 }, "medium": { "a": true, "h": "Medium", "n": "medium", "r": false, "sh": "Refers to the materials that were used to create the artwork", "t": "`$STRING`", "key$": "medium", "index$": 37 }, "metadataDate": { "a": true, "fo": "date-time", "h": "Metadata Date", "n": "metadataDate", "r": false, "sh": "Date metadata was last updated", "t": "`$STRING`", "key$": "metadataDate", "index$": 38 }, "objectBeginDate": { "a": true, "h": "Object Begin Date", "n": "objectBeginDate", "r": false, "sh": "Machine readable date indicating the year the artwork was started to be created", "t": "`$INTEGER`", "key$": "objectBeginDate", "index$": 39 }, "objectDate": { "a": true, "h": "Object Date", "n": "objectDate", "r": false, "sh": "Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created", "t": "`$STRING`", "key$": "objectDate", "index$": 40 }, "objectEndDate": { "a": true, "h": "Object End Date", "n": "objectEndDate", "r": false, "sh": "Machine readable date indicating the year the artwork was completed", "t": "`$INTEGER`", "key$": "objectEndDate", "index$": 41 }, "objectID": { "a": true, "h": "Object Id", "n": "objectID", "r": false, "sh": "Identifying number for each artwork (unique, can be used as key field)", "t": "`$INTEGER`", "key$": "objectID", "index$": 42 }, "objectIDs": { "a": true, "h": "Object I Ds", "n": "objectIDs", "r": false, "sh": "An array containing the object ID of publicly-available objects", "t": "`$ARRAY`", "key$": "objectIDs", "index$": 43 }, "objectName": { "a": true, "h": "Object Name", "n": "objectName", "r": false, "sh": "Describes the physical type of the object", "t": "`$STRING`", "key$": "objectName", "index$": 44 }, "objectURL": { "a": true, "h": "Object Url", "n": "objectURL", "r": false, "sh": "URL to object's page on metmuseum.org", "t": "`$STRING`", "key$": "objectURL", "index$": 45 }, "objectWikidata_URL": { "a": true, "h": "Object Wikidata Url", "n": "objectWikidata_URL", "r": false, "sh": "Wikidata URL for the object", "t": "`$STRING`", "key$": "objectWikidata_URL", "index$": 46 }, "period": { "a": true, "h": "Period", "n": "period", "r": false, "sh": "Time or time period when an object was created", "t": "`$STRING`", "key$": "period", "index$": 47 }, "portfolio": { "a": true, "h": "Portfolio", "n": "portfolio", "r": false, "sh": "A set of works created as a group or published as a series", "t": "`$STRING`", "key$": "portfolio", "index$": 48 }, "primaryImage": { "a": true, "h": "Primary Image", "n": "primaryImage", "r": false, "sh": "URL to the primary image of an object in JPEG format", "t": "`$STRING`", "key$": "primaryImage", "index$": 49 }, "primaryImageSmall": { "a": true, "h": "Primary Image Small", "n": "primaryImageSmall", "r": false, "sh": "URL to the lower-res primary image of an object in JPEG format", "t": "`$STRING`", "key$": "primaryImageSmall", "index$": 50 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Geographic location more specific than country", "t": "`$STRING`", "key$": "region", "index$": 51 }, "reign": { "a": true, "h": "Reign", "n": "reign", "r": false, "sh": "Reign of a monarch or ruler under which an object was created", "t": "`$STRING`", "key$": "reign", "index$": 52 }, "repository": { "a": true, "h": "Repository", "n": "repository", "r": false, "sh": "Repository information", "t": "`$STRING`", "key$": "repository", "index$": 53 }, "rightsAndReproduction": { "a": true, "h": "Rights And Reproduction", "n": "rightsAndReproduction", "r": false, "sh": "Credit line for artworks still under copyright", "t": "`$STRING`", "key$": "rightsAndReproduction", "index$": 54 }, "river": { "a": true, "h": "River", "n": "river", "r": false, "sh": "River related to the origins of an artwork", "t": "`$STRING`", "key$": "river", "index$": 55 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "State or province where the artwork was created", "t": "`$STRING`", "key$": "state", "index$": 56 }, "subregion": { "a": true, "h": "Subregion", "n": "subregion", "r": false, "sh": "Geographic location more specific than Region", "t": "`$STRING`", "key$": "subregion", "index$": 57 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "An array of subject keyword tags associated with the object", "t": "`$ARRAY`", "key$": "tags", "index$": 58 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "Title, identifying phrase, or name given to a work of art", "t": "`$STRING`", "key$": "title", "index$": 59 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "sh": "The total number of publicly-available objects", "t": "`$INTEGER`", "key$": "total", "index$": 60 } }, "id": { "field": "id", "name": "id" }, "name": "object", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /objects", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "1", "k": "query", "n": "department_id", "or": "departmentIds", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2018-10-22", "k": "query", "n": "metadata_date", "or": "metadataDate", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/objects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "objects" }], "t": { "req": "`reqdata`", "res": "`body.objectIDs`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /objects/{objectID}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 45734, "k": "param", "n": "id", "or": "objectID", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/objects/{objectID}", "q": { "exist": ["id"] }, "r": { "param": { "objectID": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "objects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "object", "name__orig": "object", "Name": "Object", "name_": "object", "name-": "object", "NAME": "OBJECT", "index$": 1 }, { "active": true, "entity": "object", "key$": "BasicObjectFlow", "kind": "basic", "name": "BasicObjectFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "object_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "object_ref01", "srcdatavar": "object_ref01_data", "suffix": "_dt0" }, "m": { "id": "object01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-object_ref01" } }], "index$": 1 }] }, 'Object', { "GET /objects": { "protocol": "http", "parameters": [{ "name": "metadataDate", "in": "query", "description": "Returns any objects with updated data after this date (format: YYYY-MM-DD)", "required": false, "schema": { "type": "string", "format": "date", "example": "2018-10-22" }, "index$": 0 }, { "name": "departmentIds", "in": "query", "description": "Returns any objects in specific department(s). Use pipe character (|) to delimit multiple department IDs (e.g., 3|9|12)", "required": false, "schema": { "type": "string", "example": "1" }, "index$": 1 }] }, "GET /objects/{objectID}": { "protocol": "http", "parameters": [{ "name": "objectID", "in": "path", "description": "The unique Object ID for an object", "required": true, "schema": { "type": "integer", "example": 45734 }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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