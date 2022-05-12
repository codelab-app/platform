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

  const props: ElementCreateInput['props'] = propsData
    ? { create: { node: { data: propsData } } }
    : undefined

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

  const component: ElementCreateInput['component'] = element.component
    ? {
        create: {
          node: {
            id: v4(),
            name: element.component.current.name,
            owner: { connect: { where: { node: { auth0Id: userId } } } },
          },
        },
      }
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
    component,
  }
}

export const makeUpdateInput = (
  input: IUpdateElementDTO,
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
