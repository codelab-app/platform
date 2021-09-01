export interface IBuildable {
  build(): string
}

export interface IDgraphQueryFilter extends IBuildable {
  build(): string
}

export interface IQueryBuilder extends IBuildable {
  build(): string
}
