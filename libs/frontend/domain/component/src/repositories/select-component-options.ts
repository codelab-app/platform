// eslint-disable-next-line @nx/enforce-module-boundaries
import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import { componentRepository } from './component.repository'

export const getSelectComponentOptions = async (
  componentDomainService: IComponentDomainService,
  component?: Pick<IComponentModel, 'id' | 'name'>,
) => {
  await componentRepository.find()

  const filtered = componentDomainService.sortedComponentsList.filter(
    (comp) => {
      if (comp.id === component?.id) {
        return false
      }

      const parentIsDescendant = comp.descendantComponents.some(
        ({ id }) => id === component?.id,
      )

      return !component?.id || !parentIsDescendant
    },
  )

  return filtered.map((comp) => ({
    label: comp.name,
    value: comp.id,
  }))
}
