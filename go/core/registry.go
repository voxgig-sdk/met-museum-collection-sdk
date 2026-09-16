package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDepartmentEntityFunc func(client *MetMuseumCollectionSDK, entopts map[string]any) MetMuseumCollectionEntity

var NewObjectEntityFunc func(client *MetMuseumCollectionSDK, entopts map[string]any) MetMuseumCollectionEntity

var NewSearchEntityFunc func(client *MetMuseumCollectionSDK, entopts map[string]any) MetMuseumCollectionEntity

