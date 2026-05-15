# ProjectName SDK exists test

import pytest
from metmuseumcollection_sdk import MetMuseumCollectionSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MetMuseumCollectionSDK.test(None, None)
        assert testsdk is not None
