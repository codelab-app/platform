import type { DefaultOptionType } from 'antd/lib/select'

type SelectComponentOptions = Promise<Array<DefaultOptionType>>

const getSelectComponentOptions = async (): SelectComponentOptions => {
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
