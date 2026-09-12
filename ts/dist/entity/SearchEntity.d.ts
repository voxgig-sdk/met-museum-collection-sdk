import { MetMuseumCollectionEntityBase } from '../MetMuseumCollectionEntityBase';
import type { MetMuseumCollectionSDK } from '../MetMuseumCollectionSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../MetMuseumCollectionTypes';
declare class SearchEntity extends MetMuseumCollectionEntityBase<Search> {
    constructor(client: MetMuseumCollectionSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
