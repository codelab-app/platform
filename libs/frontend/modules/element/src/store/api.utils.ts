import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import {
  ICreateElementDTO,
  IElement,
  IUpdateElementDTO,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

//
// Utilities for transforming the form inputs to api inputs
//

export const makeCreateInput = (
  input: ICreateElementDTO,
): ElementCreateInput => {
  const {
    id = v4(),
    parentElementId,
    instanceOfComponentId,
    atomId,
    name,
    order,
    propsData,
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

  // Always create props
  const props: ElementCreateInput['props'] = {
    create: { node: { data: propsData ?? JSON.stringify({}) } },
  }

  return {
    instanceOfComponent,
    atom,
    parentElement,
    props,
    name,
    id,
  }
}

export const makeDuplicateInput = (
  element: IElement,
  parentId: string,
  userId: string,
): ElementCreateInput => {
  const instanceOfComponent: ElementCreateInput['instanceOfComponent'] =
    element.instanceOfComponent
      ? { connect: { where: { node: { id: element.instanceOfComponent.id } } } }
      : undefined

  const atom: ElementCreateInput['atom'] = element.atom
    ? { connect: { where: { node: { id: element.atom.id } } } }
    : undefined

  const props: ElementCreateInput['props'] = element.props
    ? { create: { node: { data: element.props.jsonString } } }
    : undefined

  const parentElement: ElementCreateInput['parentElement'] = {
    connect: {
      where: {
        node: { id: parentId },
      },
      edge: { order: element.orderInParent },
    },
  }

  return {
    id: v4(),
    instanceOfComponent,
    atom,
    props,
    parentElement,
    propTransformationJs: element.propTransformationJs,
    renderIfPropKey: element.renderIfPropKey,
    renderForEachPropKey: element.renderForEachPropKey,
    name: element.name,
    css: element.css,
  }
}

export const makeUpdateInput = (
  input: IUpdateElementDTO,
): ElementUpdateInput => {
  const atom = input.atomId
    ? {
        disconnect: { where: {} },
        connect: { where: { node: { id: input.atomId } } },
      }
    : { disconnect: { where: {} } }

  const instanceOfComponent = input.instanceOfComponentId
    ? {
        disconnect: { where: {} },
        connect: { where: { node: { id: input.instanceOfComponentId } } },
      }
    : { disconnect: { where: {} } }

  return {
    name: input.name,
    atom,
    props: {
      update: {
        node: {
          data: JSON.stringify(input.props),
        },
      },
    },
    css: input.css,
    renderForEachPropKey: input.renderForEachPropKey,
    instanceOfComponent,
    renderIfPropKey: input.renderIfPropKey,
  }
}
