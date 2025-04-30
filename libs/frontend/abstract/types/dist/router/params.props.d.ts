import { UrlParams } from './url-params';
/**
 * Non-dashboard layout has no slots, only params
 *
 * Unlike `searchParams`, these are deterministic and always resolved since it's passed from server components
 *
 * ---
 *
 * The issue is that TypeScript is distributing the union type over the conditional type, resulting in a union of two separate promise types instead of a single promise with both properties.
 *
 * To fix this and get a merged type instead of a union, you can use square brackets in the conditional check to prevent distribution:
 *
 */
export type ParamProps<ParamKey extends keyof UrlParams = never> = [
    ParamKey
] extends [never] ? {
    params?: never;
} : {
    params: Promise<{
        [K in keyof UrlParams as K extends ParamKey ? K : never]: UrlParams[K];
    }>;
};
//# sourceMappingURL=params.props.d.ts.map