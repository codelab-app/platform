import type { Component } from '@codelab/shared/infra/gql'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'

import { ComponentProperties } from '@codelab/shared/domain'

export const name: IFieldResolver<Component, unknown> =
  ComponentProperties.componentNameFromCompositeKey

export const slug: IFieldResolver<Component, unknown> = (component) => {
  return ComponentProperties.componentSlugFromCompositeKey(component)
}

export const componentResolver: IResolvers = {
  Component: {
    name,
    slug,
  },
  Mutation: {},
  Query: {},
}
