import type { SelectOption } from '@codelab/frontend/abstract/types'

const getSelectComponentOptions = async (): Promise<Array<SelectOption>> => {
  await componentService.getAll()

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
