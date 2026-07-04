<?php
declare(strict_types=1);

// Object entity test

require_once __DIR__ . '/../metmuseumcollection_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ObjectEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MetMuseumCollectionSDK::test(null, null);
        $ent = $testsdk->Object(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = object_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "object." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set METMUSEUMCOLLECTION_TEST_OBJECT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $object_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.object")));
        $object_ref01_data = null;
        if (count($object_ref01_data_raw) > 0) {
            $object_ref01_data = Helpers::to_map($object_ref01_data_raw[0][1]);
        }

        // LIST
        $object_ref01_ent = $client->Object(null);
        $object_ref01_match = [];

        $object_ref01_list_result = $object_ref01_ent->list($object_ref01_match, null);
        $this->assertIsArray($object_ref01_list_result);

        // LOAD
        $object_ref01_match_dt0 = [];
        $object_ref01_data_dt0_loaded = $object_ref01_ent->load($object_ref01_match_dt0, null);
        $this->assertNotNull($object_ref01_data_dt0_loaded);

    }
}

function object_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/object/ObjectTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MetMuseumCollectionSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["object01", "object02", "object03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("METMUSEUMCOLLECTION_TEST_OBJECT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "METMUSEUMCOLLECTION_TEST_OBJECT_ENTID" => $idmap,
        "METMUSEUMCOLLECTION_TEST_LIVE" => "FALSE",
        "METMUSEUMCOLLECTION_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["METMUSEUMCOLLECTION_TEST_OBJECT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["METMUSEUMCOLLECTION_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new MetMuseumCollectionSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["METMUSEUMCOLLECTION_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["METMUSEUMCOLLECTION_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
