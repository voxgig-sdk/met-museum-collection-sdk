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
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MET_MUSEUM_COLLECTION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MET_MUSEUM_COLLECTION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MetMuseumCollectionSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MET_MUSEUM_COLLECTION_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "objectIDs": { "a": true, "h": "Object I Ds", "n": "objectIDs", "r": false, "sh": "An array containing the object IDs of matching objects", "t": "`$ARRAY`", "key$": "objectIDs", "index$": 0 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "sh": "The total number of objects matching the search query", "t": "`$INTEGER`", "key$": "total", "index$": 1 } }, "name": "search", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": true, "k": "query", "n": "artist_or_culture", "or": "artist_or_culture", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 1800, "k": "query", "n": "date_begin", "or": "date_begin", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 1900, "k": "query", "n": "date_end", "or": "date_end", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 11, "k": "query", "n": "department_id", "or": "department_id", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "Europe", "k": "query", "n": "geo_location", "or": "geo_location", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": true, "k": "query", "n": "has_image", "or": "has_image", "r": false, "t": "`$BOOLEAN`", "index$": 5 }, { "a": true, "ex": true, "k": "query", "n": "is_highlight", "or": "is_highlight", "r": false, "t": "`$BOOLEAN`", "index$": 6 }, { "a": true, "ex": true, "k": "query", "n": "is_on_view", "or": "is_on_view", "r": false, "t": "`$BOOLEAN`", "index$": 7 }, { "a": true, "ex": "Paintings", "k": "query", "n": "medium", "or": "medium", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "ex": "sunflowers", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 9 }, { "a": true, "ex": true, "k": "query", "n": "tag", "or": "tag", "r": false, "t": "`$BOOLEAN`", "index$": 10 }, { "a": true, "ex": true, "k": "query", "n": "title", "or": "title", "r": false, "t": "`$BOOLEAN`", "index$": 11 }] }, "k": "http", "m": "GET", "o": "/search", "q": { "exist": ["artist_or_culture", "date_begin", "date_end", "department_id", "geo_location", "has_image", "is_highlight", "is_on_view", "medium", "q", "tag", "title"] }, "r": {}, "s": [{ "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body.objectIDs`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 2 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "search_ref01" } }], "index$": 0 }] }, 'Search', { "GET /search": { "protocol": "http", "operationId": "searchObjects", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "total": { "description": "The total number of objects matching the search query", "key$": "total", "type": "integer" }, "objectIDs": { "description": "An array containing the object IDs of matching objects", "items": { "type": "integer" }, "key$": "objectIDs", "nullable": true, "type": "array" } }, "index$": 0 } } } }, "429": { "description": "Rate limit exceeded (80 requests per second)" } }, "parameters": [{ "name": "q", "in": "query", "description": "Search term to query the objects", "required": false, "schema": { "type": "string", "example": "sunflowers" }, "index$": 0 }, { "name": "title", "in": "query", "description": "Search against the title field", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 1 }, { "name": "tags", "in": "query", "description": "Search for objects using the subject keyword tags field", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 2 }, { "name": "departmentId", "in": "query", "description": "Filter by department ID", "required": false, "schema": { "type": "integer", "example": 11 }, "index$": 3 }, { "name": "isHighlight", "in": "query", "description": "Filter to highlight objects only", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 4 }, { "name": "isOnView", "in": "query", "description": "Filter to objects currently on view", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 5 }, { "name": "artistOrCulture", "in": "query", "description": "Filter by artist name or culture", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 6 }, { "name": "medium", "in": "query", "description": "Filter by medium", "required": false, "schema": { "type": "string", "example": "Paintings" }, "index$": 7 }, { "name": "hasImages", "in": "query", "description": "Filter to objects that have images", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 8 }, { "name": "geoLocation", "in": "query", "description": "Filter by geographic location", "required": false, "schema": { "type": "string", "example": "Europe" }, "index$": 9 }, { "name": "dateBegin", "in": "query", "description": "Filter by artwork begin date (integer year)", "required": false, "schema": { "type": "integer", "example": 1800 }, "index$": 10 }, { "name": "dateEnd", "in": "query", "description": "Filter by artwork end date (integer year)", "required": false, "schema": { "type": "integer", "example": 1900 }, "index$": 11 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LIST
        const search_ref01_ent = client.Search();
        const search_ref01_match = {};
        const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MetMuseumCollectionSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MET_MUSEUM_COLLECTION_TEST_SEARCH_ENTID': idmap,
        'MET_MUSEUM_COLLECTION_TEST_LIVE': 'FALSE',
        'MET_MUSEUM_COLLECTION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MET_MUSEUM_COLLECTION_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.MET_MUSEUM_COLLECTION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MET_MUSEUM_COLLECTION_TEST_SEARCH_ENTID'];
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
//# sourceMappingURL=SearchEntity.test.js.map