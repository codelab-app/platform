export interface UseCaseSchematicSchema {
  useCaseName: string
  moduleName: string
  resolverMethodName: string
  resolverType: 'Query' | 'Mutation'
}
