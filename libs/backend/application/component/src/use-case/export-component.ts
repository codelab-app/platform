import {
  componentSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'

export const exportComponent = async () => {
  const Component = await Repository.instance.Component

  const components = await Component.find({
    selectionSet: componentSelectionSet,
  })
}
