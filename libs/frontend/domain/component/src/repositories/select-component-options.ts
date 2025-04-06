// eslint-disable-next-line @nx/enforce-module-boundaries
import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'

/**
 * Moved here instead of `componentService` to avoid circular dependency. `RenderTypeField` in `element` requires this
 */
export const getSelectComponentOptions = async (
  componentDomainService: IComponentDomainService,
  component?: Pick<IComponentModel, 'id' | 'name'>,
) => {
  // Use non-server fetch to avoid re-render
  // components are aleardy loaded and in case we need to load them we should use ComponentBuilder as a fragment
  // const components = await componentApi().ComponentList({})

  // console.log('components', componentDomainService.componentList)

  // const hydratedComponents = components.items.map((dto) =>
  //   componentDomainService.hydrate(dto),
  // )

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
