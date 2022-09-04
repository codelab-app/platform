import {
  ComponentOGM,
  componentSelectionSet,
} from '@codelab/backend/adapter/neo4j'

export const exportComponent = async () => {
  const Component = await ComponentOGM()

  const components = await Component.find({
    selectionSet: componentSelectionSet,
  })
}
