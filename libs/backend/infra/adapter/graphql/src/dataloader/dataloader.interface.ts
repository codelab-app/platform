import type { TypeFragment } from '@codelab/shared-infra-gqlgen'
import type { GraphQLResolveInfo } from 'graphql'

import type DataLoader from 'dataloader'

export interface IDataLoaders {
  elementDependantTypesLoader: DataLoader<string, Array<TypeFragment>>
}

export interface IDataLoaderContext {
  loaders: IDataLoaders
  info?: GraphQLResolveInfo
}