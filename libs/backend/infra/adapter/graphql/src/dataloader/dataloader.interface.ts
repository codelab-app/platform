import type { ElementFragment, TypeFragment } from '@codelab/shared-infra-gqlgen'
import type { GraphQLResolveInfo } from 'graphql'

import type DataLoader from 'dataloader'

export interface IDataLoaders {
  elementDependantTypesLoader: DataLoader<string, Array<TypeFragment>>
  pageElementsLoader: DataLoader<string, Array<ElementFragment>>
}

export interface IDataLoaderContext {
  loaders: IDataLoaders
  info?: GraphQLResolveInfo
}