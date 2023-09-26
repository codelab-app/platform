import type { ContainerNode, Element } from '@codelab/shared/abstract/codegen'

export const renderType = (node: ContainerNode, ...args: any) => {
  console.log('renderType', node, args)
  return {
    ...node,
  }
}
