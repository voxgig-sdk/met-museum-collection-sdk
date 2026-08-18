<?php
declare(strict_types=1);

// MetMuseumCollection SDK configuration

class MetMuseumCollectionConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MetMuseumCollection",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://collectionapi.metmuseum.org/public/collection/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "department" => [],
                    "object" => [],
                    "search" => [],
                ],
            ],
            "entity" => [
        'department' => [
          'fields' => [
            [
              'name' => 'departmentId',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'displayName',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'department',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/departments',
                  'parts' => [
                    'departments',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.departments`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'object' => [
          'fields' => [
            [
              'name' => 'GalleryNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'accessionNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'accessionYear',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'additionalImages',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'artistAlphaSort',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistBeginDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistDisplayBio',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistDisplayName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistEndDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistGender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistNationality',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistPrefix',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistRole',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistSuffix',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistULAN_URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artistWikidata_URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'classification',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'constituents',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'county',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'creditLine',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'culture',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'department',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'dimensions',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'dimensionsParsed',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'dynasty',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'excavation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'geographyType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isHighlight',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'isPublicDomain',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'isTimelineWork',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'linkResource',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'locale',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'locus',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'measurements',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'medium',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'metadataDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objectBeginDate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'objectDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objectEndDate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'objectID',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'objectIDs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'objectName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objectURL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'objectWikidata_URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'period',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'portfolio',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'primaryImage',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'primaryImageSmall',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reign',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'repository',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rightsAndReproduction',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'river',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subregion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tags',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'object',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '1',
                        'kind' => 'query',
                        'name' => 'department_id',
                        'orig' => 'department_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '2018-10-22',
                        'kind' => 'query',
                        'name' => 'metadata_date',
                        'orig' => 'metadata_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/objects',
                  'parts' => [
                    'objects',
                  ],
                  'select' => [
                    'exist' => [
                      'department_id',
                      'metadata_date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.objectIDs`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 45734,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'object_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/objects/{objectID}',
                  'parts' => [
                    'objects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'objectID' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'objectIDs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'total',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'artist_or_culture',
                        'orig' => 'artist_or_culture',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1800,
                        'kind' => 'query',
                        'name' => 'date_begin',
                        'orig' => 'date_begin',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1900,
                        'kind' => 'query',
                        'name' => 'date_end',
                        'orig' => 'date_end',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 11,
                        'kind' => 'query',
                        'name' => 'department_id',
                        'orig' => 'department_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'Europe',
                        'kind' => 'query',
                        'name' => 'geo_location',
                        'orig' => 'geo_location',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'has_image',
                        'orig' => 'has_image',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'is_highlight',
                        'orig' => 'is_highlight',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'is_on_view',
                        'orig' => 'is_on_view',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'Paintings',
                        'kind' => 'query',
                        'name' => 'medium',
                        'orig' => 'medium',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'sunflowers',
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'parts' => [
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'artist_or_culture',
                      'date_begin',
                      'date_end',
                      'department_id',
                      'geo_location',
                      'has_image',
                      'is_highlight',
                      'is_on_view',
                      'medium',
                      'q',
                      'tag',
                      'title',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.objectIDs`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MetMuseumCollectionFeatures::make_feature($name);
    }
}
