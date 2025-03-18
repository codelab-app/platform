export enum IRouteType {
  Atom = 'Atom',
  Component = 'Component',
  Page = 'Page',
  Type = 'Type',
}

export type ExtractRouteContextParams<
  TContext,
  TRouteType extends IRouteType,
> = TContext extends { type: TRouteType; params: infer P } ? P : never
