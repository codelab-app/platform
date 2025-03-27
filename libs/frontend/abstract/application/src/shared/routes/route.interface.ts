import type { IFieldCreateRoute } from '../../field'

export enum IRouteType {
  Atom = 'Atom',
  Component = 'Component',
  Page = 'Page',
  Type = 'Type',
}

/**
 * The key fix: Using `infer T` followed by `T extends TRouteType` rather than directly matching `type: TRouteType`. This two-step approach is necessary because TypeScript needs to distribute the conditional over each member of the union individually, extracting the specific params from the matching union member only.
 */
export type ExtractRouteContextParams<
  TContext,
  TRouteType extends IRouteType,
> = TContext extends { type: infer T; params: infer P }
  ? T extends TRouteType
    ? TContext extends { searchParams: infer S }
      ? { params: P; searchParams: S }
      : { params: P }
    : never
  : never

/**
   * Cursor:
   *
   * type _Demo = {
    params: {
        interfaceId: string;
    };
    searchParams: never;
}

This is now correctly resolving to the desired type
   */
type _Demo = ExtractRouteContextParams<IFieldCreateRoute, IRouteType.Component>
