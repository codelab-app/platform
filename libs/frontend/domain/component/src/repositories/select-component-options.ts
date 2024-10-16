// eslint-disable-next-line @nx/enforce-module-boundaries
import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import type { IComponentDomainService } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import { componentRepository } from './component.repository'

export const getSelectComponentOptions = async (
  componentDomainService: IComponentDomainService,
  activeComponent?: Ref<IRuntimeComponentModel>,
) => {
  await componentRepository.find()

  const parentComponent = activeComponent?.current

  const filtered = componentDomainService.sortedComponentsList.filter(
    (component) => {
      if (component.id === parentComponent?.component.id) {
        return false
      }

      const parentIsDescendant = component.descendantComponents.some(
        ({ id }) => id === parentComponent?.component.id,
      )

      return !parentComponent?.component.id || !parentIsDescendant
    },
  )

  return filtered.map((component) => ({
    label: component.name,
    value: component.id,
  }))
}
