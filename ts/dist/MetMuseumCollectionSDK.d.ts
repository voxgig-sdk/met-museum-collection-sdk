import { DepartmentEntity } from './entity/DepartmentEntity';
import { ObjectEntity } from './entity/ObjectEntity';
import { SearchEntity } from './entity/SearchEntity';
export type * from './MetMuseumCollectionTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MetMuseumCollectionEntityBase } from './MetMuseumCollectionEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class MetMuseumCollectionSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Department(entopts?: Record<string, any>): DepartmentEntity;
    Object(entopts?: Record<string, any>): ObjectEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MetMuseumCollectionSDK;
    tester(testopts?: any, sdkopts?: any): MetMuseumCollectionSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MetMuseumCollectionSDK;
export { stdutil, config, BaseFeature, MetMuseumCollectionEntityBase, MetMuseumCollectionSDK, SDK, };
export type { DirectResult };
