import type { IComponent, IUserDto } from '@codelab/shared-abstract-core'
import type { Component } from '@codelab/shared-infra-gqlgen'
import type { DeepPick } from 'ts-essentials'

import { removeUuidAndDashPrefix, titleCase } from '@codelab/shared-utils'

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
  const slug = componentSlugFromCompositeKey(component)

  return titleCase(slug)
}

const componentSlugFromCompositeKey = (
  component: DeepPick<Component, ComponentData>,
) => {
  const slug = removeUuidAndDashPrefix(component.compositeKey)

  return slug
}

export const ComponentProperties = {
  componentCompositeKey,
  componentNameFromCompositeKey,
  componentSlugFromCompositeKey,
}
