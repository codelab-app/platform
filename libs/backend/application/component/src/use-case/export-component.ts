import type { ComponentWhere } from '@codelab/backend/abstract/codegen'
import { getElementWithDescendants } from '@codelab/backend/domain/element'
import {
  exportComponentSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'

export const exportComponents = async (where?: ComponentWhere) => {
  const Component = await Repository.instance.Component

  const components = await Component.find({
    selectionSet: exportComponentSelectionSet,
    where,
  })

  return Promise.all(
    components.map(async (component) => {
      const descendantElements = await getElementWithDescendants(
        component.rootElement.id,
      )

      return {
        component,
        descendantElements,
      }
    }),
  )
}
