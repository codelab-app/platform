import type { Element } from '@codelab/shared/infra/gql'

export const renderType = (root: Element) => {
  console.log('renderType', root)

  return root.renderType
}
