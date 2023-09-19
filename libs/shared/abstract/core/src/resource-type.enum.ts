import { ResourceType } from '@codelab/shared/abstract/codegen'

/**
 * @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __ResourceType {
  GraphQL = 'GraphQL',
  Rest = 'Rest',
}

export { ResourceType as IResourceType }
