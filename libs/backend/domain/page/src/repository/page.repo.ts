import {
  componentSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { uuidRegex } from '@codelab/shared/utils'
import flatMap from 'lodash/flatMap'
import flatten from 'lodash/flatten'

export const getPageData = async (page: OGM_TYPES.Page) => {
  const Component = await Repository.instance.Component
  const elements = [page.rootElement, ...page.rootElement.descendantElements]

  const componentIds = flatMap(elements, (element) => [
    element.parentComponent?.id,
    element.renderComponentType?.id,
    ...(element.props?.data.match(uuidRegex) || []),
  ]).filter((element): element is string => Boolean(element))

  const components = await Component.find({
    where: { id_IN: componentIds },
    selectionSet: componentSelectionSet,
  })

  const componentElements = components.map((component) => [
    component.rootElement,
    ...component.rootElement.descendantElements,
  ])

  return {
    elements: [...elements, ...flatten(componentElements)],
    components,
  }
}
