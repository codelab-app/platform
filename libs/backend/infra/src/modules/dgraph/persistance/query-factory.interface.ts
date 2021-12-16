export interface IQueryFactory {
  forGet(filter?: string, queryName?: string): string
}
