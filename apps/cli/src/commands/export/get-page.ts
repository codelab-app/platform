import {
  ComponentOGM,
  componentSelectionSet,
  IPageModel,
} from '@codelab/backend'
import { flatMap, flatten } from 'lodash'
import { getElementAndDescendants } from './get-element'

export const getPageData = async (page: IPageModel) => {
  const Component = await ComponentOGM()
  const elements = await getElementAndDescendants(page.rootElement.id)

  const componentIds = flatMap(elements, (e) => [
    e.component?.id,
    e.instanceOfComponent?.id,
  ]).filter(Boolean) as Array<string>

  const components = await Component.find({
    where: { id_IN: componentIds },
    selectionSet: componentSelectionSet,
  })

  const componentRootIds = components.map((c) => c.rootElement.id)

  const componentElements = await Promise.all(
    componentRootIds.map((id) => getElementAndDescendants(id)),
  )

  return {
    elements: [...elements, ...flatten(componentElements)],
    components,
  }
}
