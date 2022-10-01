import {
  componentSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { uuidRegex } from '@codelab/shared/utils'
import flatMap from 'lodash/flatMap'
import flatten from 'lodash/flatten'
import { getElementAndDescendants } from './get-element'

export const getPageData = async (page: OGM_TYPES.Page) => {
  const Component = await Repository.instance.Component
  const elements = await getElementAndDescendants(page.rootElement.id)

  const componentIds = flatMap(elements, (e) => [
    e.parentComponent?.id,
    e.renderComponentType?.id,
    ...(e.props?.data.match(uuidRegex) || []),
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
