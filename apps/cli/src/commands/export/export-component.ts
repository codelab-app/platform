import { ComponentOGM, componentSelectionSet } from '@codelab/backend'

export const exportComponent = async () => {
  const Component = await ComponentOGM()

  const components = await Component.find({
    selectionSet: componentSelectionSet,
  })
}
