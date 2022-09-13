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
    renderComponentTypeId,
    atomId,
    name,
    postRenderActionId,
    preRenderActionId,
    propsData,
  } = input

  const renderComponentType: ElementCreateInput['renderComponentType'] =
    renderComponentTypeId
      ? { connect: { where: { node: { id: renderComponentTypeId } } } }
      : undefined

  const renderAtomType: ElementCreateInput['renderAtomType'] = atomId
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
    renderComponentType,
    renderAtomType,
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
  const renderComponentType: ElementCreateInput['renderComponentType'] =
    element.renderComponentType
      ? { connect: { where: { node: { id: element.renderComponentType.id } } } }
      : undefined

  const renderAtomType: ElementCreateInput['renderAtomType'] = element.atom
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
    renderComponentType,
    renderAtomType,
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
  const renderAtomType = input.atomId
    ? {
        disconnect: { where: {} },
        connect: { where: { node: { id: input.atomId } } },
      }
    : { disconnect: { where: {} } }

  const renderComponentType = input.renderComponentTypeId
    ? {
        disconnect: { where: {} },
        connect: { where: { node: { id: input.renderComponentTypeId } } },
      }
    : { disconnect: { where: {} } }

  return {
    name: input.name,
    renderAtomType,
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
    renderComponentType,
    renderIfPropKey: input.renderIfPropKey,
  }
}
