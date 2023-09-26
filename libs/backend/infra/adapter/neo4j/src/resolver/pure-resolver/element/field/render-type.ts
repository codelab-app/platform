import type { ContainerNode, Element } from '@codelab/shared/abstract/codegen'

export const renderType = (root: Element) => {
  console.log('renderType', root)

  return root.renderType
}
