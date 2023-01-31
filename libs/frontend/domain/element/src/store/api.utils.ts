import type {
  ICreateElementDTO,
  IElement,
  IFieldDefaultValue,
  IInterfaceType,
  IUpdateElementDTO,
} from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import {
  connectNode,
  disconnectNode,
  reconnectNode,
} from '@codelab/shared/domain/mapper'
import { isNil } from 'ramda'
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
    renderType,
    name,
    slug,
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

  const renderAtomType =
    renderType?.model === RenderTypeEnum.Atom
      ? connectNode(renderType.id)
      : undefined

  const renderComponentType =
    renderType?.model === RenderTypeEnum.Component
      ? connectNode(renderType.id)
      : undefined

  return {
    renderComponentType,
    renderAtomType,
    props,
    slug,
    postRenderActionId,
    preRenderActionId,
    name,
    id,
  }
}

export const makeDuplicateInput = (
  element: IElement,
  duplicate_slug: string,
): ElementCreateInput => {
  const props: ElementCreateInput['props'] = element.props
    ? { create: { node: { data: element.props.jsonString } } }
    : undefined

  return {
    id: v4(),
    renderComponentType: connectNode(element.renderComponentType?.id),
    renderAtomType: connectNode(element.atom?.id),
    props,
    slug: createSlug(duplicate_slug, element.baseId),
    propTransformationJs: element.propTransformationJs,
    renderIfExpression: element.renderIfExpression,
    renderForEachPropKey: element.renderForEachPropKey,
    name: element.name,
    customCss: element.customCss,
    guiCss: element.guiCss,
  }
}

export const makeUpdateInput = (
  input: IUpdateElementDTO,
): ElementUpdateInput => {
  const {
    renderType,
    name,
    slug,
    postRenderActionId,
    preRenderActionId,
    props,
    customCss,
    guiCss,
    renderForEachPropKey,
    renderIfExpression,
    propsData,
  } = input

  // If render type changes, we replace the existing `props` connected to the
  // element with the new `props` from the default values of the new interface type
  const updateProps: ElementUpdateInput['props'] = {
    update: { node: { data: propsData ?? JSON.stringify(props) } },
  }

  // We need to disconnect the atom if render type changed to component or empty
  const renderAtomType =
    renderType?.model === RenderTypeEnum.Atom
      ? reconnectNode(renderType.id)
      : disconnectNode(undefined)

  // We need to disconnect the component if render type changed to atom or empty
  const renderComponentType =
    renderType?.model === RenderTypeEnum.Component
      ? reconnectNode(renderType.id)
      : disconnectNode(undefined)

  return {
    name: name,
    renderAtomType,
    renderComponentType,
    slug: slug,
    props: updateProps,
    customCss: customCss,
    postRenderActionId: postRenderActionId || null,
    preRenderActionId: preRenderActionId || null,
    guiCss: guiCss,
    renderForEachPropKey: renderForEachPropKey,
    renderIfExpression: renderIfExpression,
  }
}

/**
 * Generates a JSON containing api fields that has a default value
 * that will be saved as props for the new element created
 */
export const makeDefaultProps = (typeApi: Maybe<IInterfaceType>) => {
  const fields = typeApi?.fields ?? []

  const defaultProps = fields.reduce<Record<string, IFieldDefaultValue>>(
    (acc, field) => {
      if (!isNil(field.defaultValues)) {
        acc[field.key] = field.defaultValues
      }

      return acc
    },
    {},
  )

  return JSON.stringify(defaultProps)
}
