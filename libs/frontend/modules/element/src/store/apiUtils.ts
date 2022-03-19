import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen-v2'
import { CreateElementInput } from '../use-cases/element/create-element/createElementSchema'
import { UpdateElementInput } from '../use-cases/element/update-element/updateElementSchema'

//
// Utilities for transforming the form inputs to api inputs
//

export const makeCreateInput = (
  input: CreateElementInput,
): ElementCreateInput => {
  const {
    parentElementId,
    instanceOfComponentId,
    atomId,
    order,
    propsData,
    ...data
  } = input

  const instanceOfComponent: ElementCreateInput['instanceOfComponent'] =
    instanceOfComponentId
      ? { connect: { where: { node: { id: instanceOfComponentId } } } }
      : undefined

  const atom: ElementCreateInput['atom'] = atomId
    ? { connect: { where: { node: { id: atomId } } } }
    : undefined

  const parentElement: ElementCreateInput['parentElement'] = parentElementId
    ? {
        connect: {
          where: { node: { id: parentElementId } },
          edge: { order },
        },
      }
    : undefined

  const props: ElementCreateInput['props'] = propsData
    ? { create: { node: { data: propsData } } }
    : undefined

  return {
    instanceOfComponent,
    atom,
    parentElement,
    props,
    ...data,
  }
}

export const makeUpdateInput = (
  input: UpdateElementInput,
): ElementUpdateInput => {
  const atom = input.atomId
    ? { connect: { where: { node: { id: input.atomId } } } }
    : { disconnect: { where: {} } }

  const instanceOfComponent = input.instanceOfComponentId
    ? { connect: { where: { node: { id: input.instanceOfComponentId } } } }
    : { disconnect: { where: {} } }

  return {
    name: input.name,
    atom,
    renderForEachPropKey: input.renderForEachPropKey,
    instanceOfComponent,
    renderIfPropKey: input.renderIfPropKey,
  }
}
