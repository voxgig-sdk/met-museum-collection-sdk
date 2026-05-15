<?php
declare(strict_types=1);

// MetMuseumCollection SDK exists test

require_once __DIR__ . '/../metmuseumcollection_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MetMuseumCollectionSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
