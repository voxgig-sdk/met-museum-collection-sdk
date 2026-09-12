import { MetMuseumCollectionEntityBase } from '../MetMuseumCollectionEntityBase';
import type { MetMuseumCollectionSDK } from '../MetMuseumCollectionSDK';
import type { Control } from '../types';
import type { Department, DepartmentListMatch } from '../MetMuseumCollectionTypes';
declare class DepartmentEntity extends MetMuseumCollectionEntityBase<Department> {
    constructor(client: MetMuseumCollectionSDK, entopts: any);
    make(this: DepartmentEntity): DepartmentEntity;
    list(this: any, reqmatch?: DepartmentListMatch, ctrl?: Control): Promise<DepartmentEntity[]>;
}
export { DepartmentEntity };
