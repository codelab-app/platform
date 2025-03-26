export enum IRouteType {
  Atom = 'Atom',
  Component = 'Component',
  Page = 'Page',
  Type = 'Type',
}

/**
 * Choose from union based on type
 */
export type ExtractRouteContextParams<
  TContext,
  TRouteType extends IRouteType,
> = [TContext] extends [never]
  ? never
  : TContext extends {
      type: TRouteType
      params: infer Params
      searchParams: infer SearchParams
    }
  ? {
      params: Params
      searchParams: SearchParams
    }
  : { [K in keyof TContext]: never }
