import type {
  ElementFragment,
  TypeFragment,
} from '@codelab/shared-infra-gqlgen'
import type DataLoader from 'dataloader'
import type { GraphQLResolveInfo } from 'graphql'

export interface IDataLoaders {
  elementDependantTypesLoader: DataLoader<string, Array<TypeFragment>>
  pageElementsLoader: DataLoader<string, Array<ElementFragment>>
}

export interface IDataLoaderContext {
  info?: GraphQLResolveInfo
  loaders: IDataLoaders
}
