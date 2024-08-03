import type { IComponent, IUserDto } from '@codelab/shared/abstract/core'
import type { Component } from '@codelab/shared/infra/gql'
import { slugify } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface ComponentData {
  compositeKey: never
  owner: { id: never }
}

const SEPARATOR_SYMBOL = '-'

const componentCompositeKey = (
  component: Pick<IComponent, 'slug'>,
  user: Pick<IUserDto, 'id'>,
) => `${user.id}${SEPARATOR_SYMBOL}${component.slug}`

const componentNameFromCompositeKey = (
  component: DeepPick<Component, ComponentData>,
) => {
  // return component.compositeKey.replace(`${component.owner.id}-`, '')
  return component.compositeKey.split(SEPARATOR_SYMBOL).pop()
}

const componentSlugFromCompositeKey = (
  component: DeepPick<Component, ComponentData>,
) => {
  return slugify(ComponentProperties.componentNameFromCompositeKey(component))
}

export const ComponentProperties = {
  componentCompositeKey,
  componentNameFromCompositeKey,
  componentSlugFromCompositeKey,
}
