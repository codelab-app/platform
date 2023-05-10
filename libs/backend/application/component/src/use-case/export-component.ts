import { getElementWithDescendants } from '@codelab/backend/domain/element'
import {
  componentSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export interface ExportComponentsProps {
  where?: OGM_TYPES.ComponentWhere
}

export const exportComponents = async (props: ExportComponentsProps = {}) => {
  const Component = await Repository.instance.Component

  const components = await Component.find({
    selectionSet: componentSelectionSet,
    where: props.where,
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
