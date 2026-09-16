# MetMuseumCollection SDK feature factory

from metmuseumcollection_sdk.feature.base_feature import MetMuseumCollectionBaseFeature
from metmuseumcollection_sdk.feature.ratelimit_feature import MetMuseumCollectionRatelimitFeature
from metmuseumcollection_sdk.feature.retry_feature import MetMuseumCollectionRetryFeature
from metmuseumcollection_sdk.feature.test_feature import MetMuseumCollectionTestFeature
from metmuseumcollection_sdk.feature.timeout_feature import MetMuseumCollectionTimeoutFeature


_FEATURES = {
    "base": lambda: MetMuseumCollectionBaseFeature(),
    "ratelimit": lambda: MetMuseumCollectionRatelimitFeature(),
    "retry": lambda: MetMuseumCollectionRetryFeature(),
    "test": lambda: MetMuseumCollectionTestFeature(),
    "timeout": lambda: MetMuseumCollectionTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
