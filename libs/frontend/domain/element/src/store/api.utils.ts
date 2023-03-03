import type {
  IElement,
  IFieldDefaultValue,
  IInterfaceType,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  IRenderTypeKind,
  isComponentModel,
} from '@codelab/frontend/abstract/core'
import { atomRef, isAtomModel } from '@codelab/frontend/domain/atom'
import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
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
  update: input,
  where: { id: element.id },
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

export const makeDuplicateInput = (
  element: IElement,
  duplicate_name: string,
): ElementCreateInput => {
  const props: ElementCreateInput['props'] = {
    create: { node: { data: element.props.current.jsonString } },
  }

  return {
    customCss: element.customCss,
    guiCss: element.guiCss,
    id: v4(),
    name: createUniqueName(duplicate_name, { id: element.baseId }),
    props,
    propTransformationJs: element.propTransformationJs,
    renderAtomType: isAtomModel(element.renderType)
      ? connectNodeId(element.renderType.id)
      : null,
    renderComponentType: isComponentModel(element.renderType)
      ? connectNodeId(element.renderType.id)
      : null,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfExpression: element.renderIfExpression,
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
