import type { Component } from '@codelab/shared/infra/gql'
import type { IComponent, IUserDto } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface ComponentData {
  compositeKey: never
  owner: { id: never }
}

const componentCompositeKey = (
  app: Pick<IComponent, 'slug'>,
  user: Pick<IUserDto, 'id'>,
) => `${user.id}-${app.slug}`

const componentNameFromCompositeKey = (
  app: DeepPick<Component, ComponentData>,
) => {
  return app.compositeKey.replace(`${app.owner.id}-`, '')
}

const componentSlugFromCompositeKey = (
  app: DeepPick<Component, ComponentData>,
) => {
  return slugify(ComponentProperties.componentNameFromCompositeKey(app))
}

export const ComponentProperties = {
  componentCompositeKey,
  componentNameFromCompositeKey,
  componentSlugFromCompositeKey,
}
