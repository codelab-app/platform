import { IPropData } from '@codelab/shared-abstract-core';
import { ObjectLike } from '@codelab/shared-abstract-types';
export declare const hasExpression: (str: unknown) => boolean;
export declare const evaluateObject: <IContext extends ObjectLike>(props: IPropData, context: IContext) => ObjectLike;
export declare const isSingleExpression: (str: string) => boolean;
export declare const stripExpression: (expression: string) => string;
export declare const evaluateExpression: <IContext extends ObjectLike>(expression: string, context: IContext) => any;
