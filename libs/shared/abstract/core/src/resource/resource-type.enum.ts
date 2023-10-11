import { ResourceType } from '@codelab/shared/abstract/codegen'

/**
 * @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __ResourceType {
  // Can't use GraphQL, as OGM generates GraphQl from
  GraphQl = 'GraphQl',
  Rest = 'Rest',
}

export { ResourceType as IResourceType }
