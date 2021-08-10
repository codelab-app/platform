export enum UseCaseType {
  Regular = 'regular',
  Dgraph = 'dgraph',
  Mutation = 'mutation',
  Query = 'query',
}

export const useCaseToClassMap: Record<UseCaseType, string> = {
  [UseCaseType.Regular]: 'UseCase',
  [UseCaseType.Dgraph]: 'DgraphUseCase',
  [UseCaseType.Mutation]: 'MutationUseCase',
  [UseCaseType.Query]: 'QueryUseCase',
}
