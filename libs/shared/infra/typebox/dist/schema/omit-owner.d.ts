import { TObject } from '@sinclair/typebox';
export declare const OmitOwner: <T extends TObject>(schema: T) => import('@sinclair/typebox').TOmit<T, ["owner"], T extends import('@sinclair/typebox').TRef<string> ? true : false, false>;
