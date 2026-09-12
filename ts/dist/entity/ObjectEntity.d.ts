import { MetMuseumCollectionEntityBase } from '../MetMuseumCollectionEntityBase';
import type { MetMuseumCollectionSDK } from '../MetMuseumCollectionSDK';
import type { Control } from '../types';
import type { ObjectType, ObjectLoadMatch, ObjectListMatch } from '../MetMuseumCollectionTypes';
declare class ObjectEntity extends MetMuseumCollectionEntityBase<ObjectType> {
    constructor(client: MetMuseumCollectionSDK, entopts: any);
    make(this: ObjectEntity): ObjectEntity;
    load(this: any, reqmatch?: ObjectLoadMatch, ctrl?: Control): Promise<ObjectEntity>;
    list(this: any, reqmatch?: ObjectListMatch, ctrl?: Control): Promise<ObjectEntity[]>;
}
export { ObjectEntity };
