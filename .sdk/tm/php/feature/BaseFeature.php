<?php
declare(strict_types=1);

// MetMuseumCollection SDK base feature

class MetMuseumCollectionBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MetMuseumCollectionContext $ctx, array $options): void {}
    public function PostConstruct(MetMuseumCollectionContext $ctx): void {}
    public function PostConstructEntity(MetMuseumCollectionContext $ctx): void {}
    public function SetData(MetMuseumCollectionContext $ctx): void {}
    public function GetData(MetMuseumCollectionContext $ctx): void {}
    public function GetMatch(MetMuseumCollectionContext $ctx): void {}
    public function SetMatch(MetMuseumCollectionContext $ctx): void {}
    public function PrePoint(MetMuseumCollectionContext $ctx): void {}
    public function PreSpec(MetMuseumCollectionContext $ctx): void {}
    public function PreRequest(MetMuseumCollectionContext $ctx): void {}
    public function PreResponse(MetMuseumCollectionContext $ctx): void {}
    public function PreResult(MetMuseumCollectionContext $ctx): void {}
    public function PreDone(MetMuseumCollectionContext $ctx): void {}
    public function PreUnexpected(MetMuseumCollectionContext $ctx): void {}
}
