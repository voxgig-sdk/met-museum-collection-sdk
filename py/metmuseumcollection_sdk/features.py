# MetMuseumCollection SDK feature factory

from metmuseumcollection_sdk.feature.base_feature import MetMuseumCollectionBaseFeature
from metmuseumcollection_sdk.feature.test_feature import MetMuseumCollectionTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MetMuseumCollectionBaseFeature(),
        "test": lambda: MetMuseumCollectionTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
