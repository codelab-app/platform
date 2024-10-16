import { PageKind } from '@codelab/shared/infra/gql'

/**
 * We create the enum here then import into Neo4j graphql schema so we can get linting
 *
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __PageKind {
  InternalServerError = 'InternalServerError',
  NotFound = 'NotFound',
  Provider = 'Provider',
  Regular = 'Regular',
}

export { PageKind as IPageKind }

export enum IPageKindName {
  InternalServerError = '500',
  NotFound = '404',
  Provider = 'provider',
}
