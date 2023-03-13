import type {
  IAtomService,
  IComponentService,
  IElement,
  IFieldDefaultValue,
  IInterfaceType,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  IRenderTypeKind,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
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

type GetRenderTypeApi = (props: {
  renderType: RenderType | null
  atomService: IAtomService
  componentService: IComponentService
}) => Ref<IInterfaceType> | undefined

/**
 * We can't access model using id with Ref (since ref is not attached to root tree), so need service to access it
 */
export const getRenderTypeApi: GetRenderTypeApi = ({
  atomService,
  componentService,
  renderType,
}) => {
  // When creating a new element, we need the interface type fields
  // and we use it to create a props with default values for the created element
  let renderTypeApi: Ref<IInterfaceType> | undefined = undefined

  if (renderType?.kind === IRenderTypeKind.Atom) {
    const renderTypeRef = atomService.atoms.get(renderType.id)
    renderTypeApi = renderTypeRef?.api
  }

  if (renderType?.kind === IRenderTypeKind.Component) {
    const renderTypeRef = componentService.components.get(renderType.id)
    renderTypeApi = renderTypeRef?.api
  }

  return renderTypeApi
}

export const makeDuplicateInput = (
  element: IElement,
  duplicate_name: string,
): ElementCreateInput => {
  const props: ElementCreateInput['props'] = {
    create: { node: { data: element.props.current.jsonString, id: v4() } },
  }

  return {
    customCss: element.customCss,
    guiCss: element.guiCss,
    id: v4(),
    name: createUniqueName(duplicate_name, element.baseId),
    props,
    propTransformationJs: element.propTransformationJs,
    renderAtomType: isAtomInstance(element.renderType)
      ? connectNodeId(element.renderType.id)
      : null,
    renderComponentType: isComponentInstance(element.renderType)
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
