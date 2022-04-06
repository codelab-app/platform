import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { Element } from '../store'
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

export const makeDuplicateInput = (
  element: Element,
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
