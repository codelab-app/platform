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

export const makeUpdateElementInput = (
  element: Pick<IElement, 'id'>,
  input: ElementUpdateInput,
) => ({
  where: { id: element.id },
  update: input,
})

export const makeCreateInput = (
  input: ICreateElementDTO,
): ElementCreateInput => {
  const {
    id = v4(),
    parentElementId,
    instanceOfComponentId,
    atomId,
    name,
    postRenderActionId,
    preRenderActionId,
    propsData,
  } = input

  const componentRenderType: ElementCreateInput['componentRenderType'] =
    instanceOfComponentId
      ? { connect: { where: { node: { id: instanceOfComponentId } } } }
      : undefined

  const atomRenderType: ElementCreateInput['atomRenderType'] = atomId
    ? { connect: { where: { node: { id: atomId } } } }
    : undefined

  const parentElement: ElementCreateInput['parentElement'] = parentElementId
    ? {
        connect: {
          where: { node: { id: parentElementId } },
        },
      }
    : undefined

  // Always create props
  const props: ElementCreateInput['props'] = {
    create: { node: { data: propsData ?? JSON.stringify({}) } },
  }

  return {
    componentRenderType,
    atomRenderType,
    parentElement,
    props,
    postRenderActionId,
    preRenderActionId,
    name,
    id,
  }
}

export const makeDuplicateInput = (
  element: IElement,
  parentId: string,
  userId: string,
): ElementCreateInput => {
  const componentRenderType: ElementCreateInput['componentRenderType'] =
    element.componentRenderType
      ? { connect: { where: { node: { id: element.componentRenderType.id } } } }
      : undefined

  const atomRenderType: ElementCreateInput['atomRenderType'] = element.atom
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
    },
  }

  return {
    id: v4(),
    componentRenderType,
    atomRenderType,
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
  const atomRenderType = input.atomId
    ? {
        disconnect: { where: {} },
        connect: { where: { node: { id: input.atomId } } },
      }
    : { disconnect: { where: {} } }

  const componentRenderType = input.instanceOfComponentId
    ? {
        disconnect: { where: {} },
        connect: { where: { node: { id: input.instanceOfComponentId } } },
      }
    : { disconnect: { where: {} } }

  return {
    name: input.name,
    atomRenderType,
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
    componentRenderType,
    renderIfPropKey: input.renderIfPropKey,
  }
}
