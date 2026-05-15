package voxgigmetmuseumcollectionsdk

import (
	"github.com/voxgig-sdk/met-museum-collection-sdk/core"
	"github.com/voxgig-sdk/met-museum-collection-sdk/entity"
	"github.com/voxgig-sdk/met-museum-collection-sdk/feature"
	_ "github.com/voxgig-sdk/met-museum-collection-sdk/utility"
)

// Type aliases preserve external API.
type MetMuseumCollectionSDK = core.MetMuseumCollectionSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MetMuseumCollectionEntity = core.MetMuseumCollectionEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MetMuseumCollectionError = core.MetMuseumCollectionError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDepartmentEntityFunc = func(client *core.MetMuseumCollectionSDK, entopts map[string]any) core.MetMuseumCollectionEntity {
		return entity.NewDepartmentEntity(client, entopts)
	}
	core.NewObjectEntityFunc = func(client *core.MetMuseumCollectionSDK, entopts map[string]any) core.MetMuseumCollectionEntity {
		return entity.NewObjectEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.MetMuseumCollectionSDK, entopts map[string]any) core.MetMuseumCollectionEntity {
		return entity.NewSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMetMuseumCollectionSDK = core.NewMetMuseumCollectionSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
