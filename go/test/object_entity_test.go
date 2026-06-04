package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/met-museum-collection-sdk/go"
	"github.com/voxgig-sdk/met-museum-collection-sdk/go/core"

	vs "github.com/voxgig-sdk/met-museum-collection-sdk/go/utility/struct"
)

func TestObjectEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Object(nil)
		if ent == nil {
			t.Fatal("expected non-nil ObjectEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := objectBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "object." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set METMUSEUMCOLLECTION_TEST_OBJECT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		objectRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.object", setup.data)))
		var objectRef01Data map[string]any
		if len(objectRef01DataRaw) > 0 {
			objectRef01Data = core.ToMapAny(objectRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = objectRef01Data

		// LIST
		objectRef01Ent := client.Object(nil)
		objectRef01Match := map[string]any{}

		objectRef01ListResult, err := objectRef01Ent.List(objectRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, objectRef01ListOk := objectRef01ListResult.([]any)
		if !objectRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", objectRef01ListResult)
		}

		// LOAD
		objectRef01MatchDt0 := map[string]any{}
		objectRef01DataDt0Loaded, err := objectRef01Ent.Load(objectRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if objectRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func objectBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "object", "ObjectTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read object test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse object test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"object01", "object02", "object03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("METMUSEUMCOLLECTION_TEST_OBJECT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"METMUSEUMCOLLECTION_TEST_OBJECT_ENTID": idmap,
		"METMUSEUMCOLLECTION_TEST_LIVE":      "FALSE",
		"METMUSEUMCOLLECTION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["METMUSEUMCOLLECTION_TEST_OBJECT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["METMUSEUMCOLLECTION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewMetMuseumCollectionSDK(core.ToMapAny(mergedOpts))
	}

	live := env["METMUSEUMCOLLECTION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["METMUSEUMCOLLECTION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
