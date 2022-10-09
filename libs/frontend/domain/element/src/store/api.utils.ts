import {
  ICreateElementDTO,
  IElement,
  IUpdateElementDTO,
} from '@codelab/frontend/abstract/core'
import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { connectNode, reconnectNode } from '@codelab/shared/data'
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
    renderComponentTypeId,
    atomId,
    name,
    postRenderActionId,
    preRenderActionId,
    propsData,
  } = input

  /**
   * Here we'll want to set default value based on the interface
   */
  const props: ElementCreateInput['props'] = {
    create: { node: { data: propsData ?? JSON.stringify({}) } },
  }

  return {
    renderComponentType: connectNode(renderComponentTypeId),
    renderAtomType: connectNode(atomId),
    props,
    postRenderActionId,
    preRenderActionId,
    name,
    id,
  }
}

export const makeDuplicateInput = (element: IElement): ElementCreateInput => {
  const props: ElementCreateInput['props'] = element.props
    ? { create: { node: { data: element.props.jsonString } } }
    : undefined

  return {
    id: v4(),
    renderComponentType: connectNode(element.renderComponentType?.id),
    renderAtomType: connectNode(element.atom?.id),
    props,
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
  const renderAtomType = reconnectNode(input.atomId)
  const renderComponentType = reconnectNode(input.renderComponentTypeId)

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
