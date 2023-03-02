import type {
  IAtom,
  IComponent,
  ICreateElementData,
  IElement,
  IFieldDefaultValue,
  IInterfaceType,
  IUpdateElementData,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  IRenderTypeKind,
  isAtomModel,
  isComponentModel,
} from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import { componentRef } from '@codelab/frontend/presenter/container'
import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  disconnectNodeId,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import type { Ref } from 'mobx-keystone'
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

export const getRenderTypeApi = (
  renderType: RenderType | null,
): Ref<IInterfaceType> | null => {
  // When creating a new element, we need the interface type fields
  // and we use it to create a props with default values for the created element
  let renderTypeApi: Ref<IInterfaceType> | null = null

  if (renderType?.kind === IRenderTypeKind.Atom) {
    const renderTypeRef = atomRef(renderType.id)
    renderTypeApi = renderTypeRef.current.api
  }

  if (renderType?.kind === IRenderTypeKind.Component) {
    const renderTypeRef = componentRef(renderType.id)
    renderTypeApi = renderTypeRef.current.api
  }

  return renderTypeApi
}

export const makeCreateInput = (
  input: ICreateElementData,
): ElementCreateInput => {
  const {
    id = v4(),
    renderType,
    name,
    postRenderAction,
    preRenderAction,
    props,
  } = input

  /**
   * Here we'll want to set default value based on the interface
   */
  const createProps: ElementCreateInput['props'] = {
    create: { node: { data: JSON.stringify(props?.data) } },
  }

  const renderAtomType =
    renderType?.kind === IRenderTypeKind.Atom
      ? connectNodeId(renderType.id)
      : undefined

  const renderComponentType =
    renderType?.kind === IRenderTypeKind.Component
      ? connectNodeId(renderType.id)
      : undefined

  return {
    renderComponentType,
    renderAtomType,
    props: createProps,
    postRenderAction: connectNodeId(postRenderAction?.id),
    preRenderAction: connectNodeId(preRenderAction?.id),
    name,
    id,
  }
}

export const makeDuplicateInput = (
  element: IElement,
  duplicate_name: string,
): ElementCreateInput => {
  const props: ElementCreateInput['props'] = element.props
    ? { create: { node: { data: element.props.current.jsonString } } }
    : undefined

  return {
    id: v4(),
    renderComponentType: isComponentModel(element.renderType)
      ? connectNodeId(element.renderType.id)
      : null,
    renderAtomType: isAtomModel(element.renderType)
      ? connectNodeId(element.renderType.id)
      : null,
    props,
    name: createUniqueName(duplicate_name, { id: element.baseId }),
    propTransformationJs: element.propTransformationJs,
    renderIfExpression: element.renderIfExpression,
    renderForEachPropKey: element.renderForEachPropKey,
    customCss: element.customCss,
    guiCss: element.guiCss,
  }
}

export const makeUpdateInput = (
  input: IUpdateElementData,
): ElementUpdateInput => {
  const {
    renderType,
    name,
    postRenderAction,
    preRenderAction,
    customCss,
    guiCss,
    renderForEachPropKey,
    renderIfExpression,
    props,
  } = input

  // If render type changes, we replace the existing `props` connected to the
  // element with the new `props` from the default values of the new interface type
  const updateProps: ElementUpdateInput['props'] = {
    update: { node: { data: JSON.stringify(props?.data) } },
  }

  // We need to disconnect the atom if render type changed to component or empty
  const renderAtomType =
    renderType?.kind === IRenderTypeKind.Atom
      ? reconnectNodeId(renderType.id)
      : disconnectNodeId(undefined)

  // We need to disconnect the component if render type changed to atom or empty
  const renderComponentType =
    renderType?.kind === IRenderTypeKind.Component
      ? reconnectNodeId(renderType.id)
      : disconnectNodeId(undefined)

  return {
    name,
    renderAtomType,
    renderComponentType,
    props: updateProps,
    customCss,
    postRenderAction: reconnectNodeId(postRenderAction?.id),
    preRenderAction: reconnectNodeId(preRenderAction?.id),
    guiCss,
    renderForEachPropKey,
    renderIfExpression,
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
  // return defaultProps
}
