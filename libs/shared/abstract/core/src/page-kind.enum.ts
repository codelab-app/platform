import { PageKind } from '@codelab/shared/abstract/codegen'

/**
 * We create the enum here then import into Neo4j graphql schema so we can get linting
 *
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __PageKind {
  Provider = 'Provider',
  InternalServerError = 'InternalServerError',
  NotFound = 'NotFound',
  Regular = 'Regular',
}

export { PageKind as IPageKind }

export enum IPageKindName {
  Provider = '_app',
  InternalServerError = '500',
  NotFound = '404',
}
