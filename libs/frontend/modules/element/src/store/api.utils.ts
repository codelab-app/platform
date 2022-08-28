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

export const makePatchElementInput = (
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
    instanceOfComponentId,
    atomId,
    name,
    postRenderActionId,
    preRenderActionId,
    propsData,
  } = input

  const instanceOfComponent: ElementCreateInput['instanceOfComponent'] =
    instanceOfComponentId
      ? { connect: { where: { node: { id: instanceOfComponentId } } } }
      : undefined

  const atom: ElementCreateInput['atom'] = atomId
    ? { connect: { where: { node: { id: atomId } } } }
    : undefined

  // Always create props
  const props: ElementCreateInput['props'] = {
    create: { node: { data: propsData ?? JSON.stringify({}) } },
  }

  return {
    instanceOfComponent,
    atom,
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

  return {
    id: v4(),
    instanceOfComponent,
    atom,
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
