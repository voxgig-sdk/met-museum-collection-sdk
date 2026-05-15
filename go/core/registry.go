package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDepartmentEntityFunc func(client *MetMuseumCollectionSDK, entopts map[string]any) MetMuseumCollectionEntity

var NewObjectEntityFunc func(client *MetMuseumCollectionSDK, entopts map[string]any) MetMuseumCollectionEntity

var NewSearchEntityFunc func(client *MetMuseumCollectionSDK, entopts map[string]any) MetMuseumCollectionEntity

