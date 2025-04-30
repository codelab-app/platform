import { ObjectLike } from '@codelab/shared-abstract-types';
export type WithStyleProp<T extends ObjectLike> = T & {
    style?: Record<string, number | string>;
};
//# sourceMappingURL=utils.d.ts.map