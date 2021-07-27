import { CreateElementInput } from '@codelab/codegen/graphql'

export const createRootElementInput: CreateElementInput = {
  name: 'Root Element',
}

export const createParent1ElementInputFunc = (rootElementId: any) => ({
  name: 'Parent Element 1',
  parentElementId: rootElementId,
})

export const createParent2ElementInputFunc = (rootElementId: any) => ({
  name: 'Parent Element 2',
  parentElementId: rootElementId,
})

export const createChildElementInputFunc = (parentElementId: any) => ({
  name: 'Child Element',
  parentElementId,
})
