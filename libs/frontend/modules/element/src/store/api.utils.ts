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

/**
 * create
 * linked by
 */
//

export const makeCreateInput = (
  input: ICreateElementDTO,
  prevSibling?: IElement,
  parentElement?: IElement,
): ElementCreateInput => {
  const {
    id = v4(),
    parentElementId,
    instanceOfComponentId,
    atomId,
    name,
    postRenderActionId,
    preRenderActionId,
    order,
    propsData,
    prevSiblingId,
  } = input

  const instanceOfComponent: ElementCreateInput['instanceOfComponent'] =
    instanceOfComponentId
      ? { connect: { where: { node: { id: instanceOfComponentId } } } }
      : undefined

  const atom: ElementCreateInput['atom'] = atomId
    ? { connect: { where: { node: { id: atomId } } } }
    : undefined

  const parentElementPayload: ElementCreateInput['parentElement'] =
    parentElementId
      ? {
          connect: {
            where: { node: { id: parentElementId } },
            edge: { order },
          },
        }
      : undefined

  let prevSiblingPayload: ElementCreateInput['prevSibling'] = undefined

  // not add at the beginning
  // x-[new] | x-[new]-x
  if (prevSiblingId) {
    prevSiblingPayload = {
      connect: {
        where: { node: { id: prevSiblingId } },
      },
    }
  }

  const nextSiblingOfPrevSibling = prevSibling?.nextSibling
  let nextSiblingPayload = undefined

  if (nextSiblingOfPrevSibling) {
    // add in the middle. a -> b ----> a -> [c] -> b
    // connect c to b
    nextSiblingPayload = {
      connect: {
        where: { node: { id: nextSiblingOfPrevSibling.id } },
      },
    }
  }

  if (!prevSibling && parentElement?.childrenRoot) {
    // [new]-x-y-z
    // no prev sibling = add as root
    // if root exist, link to root
    nextSiblingPayload = {
      connect: {
        where: { node: { id: parentElement.childrenRoot.id } },
      },
    }
  }

  const rootOf: ElementCreateInput['childrenRoot'] = prevSiblingId
    ? undefined
    : {
        connect: {
          where: { node: { id: parentElementId } },
        },
      }

  // Always create props
  const props: ElementCreateInput['props'] = {
    create: { node: { data: propsData ?? JSON.stringify({}) } },
  }

  return {
    instanceOfComponent,
    atom,
    parentElement: parentElementPayload,
    props,
    postRenderActionId,
    preRenderActionId,
    name,
    id,
    prevSibling: prevSiblingPayload,
    nextSibling: nextSiblingPayload,
    rootOf,
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
    customCss: element.customCss,
    guiCss: element.guiCss,
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
    customCss: input.customCss,
    postRenderActionId: input.postRenderActionId || null,
    preRenderActionId: input.preRenderActionId || null,
    guiCss: input.guiCss,
    renderForEachPropKey: input.renderForEachPropKey,
    instanceOfComponent,
    renderIfPropKey: input.renderIfPropKey,
  }
}
