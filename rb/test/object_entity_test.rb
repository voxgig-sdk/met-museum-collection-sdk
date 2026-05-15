# Object entity test

require "minitest/autorun"
require "json"
require_relative "../MetMuseumCollection_sdk"
require_relative "runner"

class ObjectEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MetMuseumCollectionSDK.test(nil, nil)
    ent = testsdk.Object(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = object_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "object." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set METMUSEUMCOLLECTION_TEST_OBJECT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    object_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.object")))
    object_ref01_data = nil
    if object_ref01_data_raw.length > 0
      object_ref01_data = Helpers.to_map(object_ref01_data_raw[0][1])
    end

    # LIST
    object_ref01_ent = client.Object(nil)
    object_ref01_match = {}

    object_ref01_list_result, err = object_ref01_ent.list(object_ref01_match, nil)
    assert_nil err
    assert object_ref01_list_result.is_a?(Array)

    # LOAD
    object_ref01_match_dt0 = {}
    object_ref01_data_dt0_loaded, err = object_ref01_ent.load(object_ref01_match_dt0, nil)
    assert_nil err
    assert !object_ref01_data_dt0_loaded.nil?

  end
end

def object_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "object", "ObjectTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MetMuseumCollectionSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["object01", "object02", "object03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["METMUSEUMCOLLECTION_TEST_OBJECT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "METMUSEUMCOLLECTION_TEST_OBJECT_ENTID" => idmap,
    "METMUSEUMCOLLECTION_TEST_LIVE" => "FALSE",
    "METMUSEUMCOLLECTION_TEST_EXPLAIN" => "FALSE",
    "METMUSEUMCOLLECTION_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["METMUSEUMCOLLECTION_TEST_OBJECT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["METMUSEUMCOLLECTION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["METMUSEUMCOLLECTION_APIKEY"],
      },
      extra || {},
    ])
    client = MetMuseumCollectionSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["METMUSEUMCOLLECTION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["METMUSEUMCOLLECTION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
