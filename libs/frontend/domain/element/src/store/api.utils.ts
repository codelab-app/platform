import type {
  IAtomService,
  IComponentService,
  IElement,
  IFieldDefaultValue,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import type { ElementUpdateInput } from '@codelab/shared/abstract/codegen'
import type { RenderType } from '@codelab/shared/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { isNil } from 'ramda'

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
  atomService: IAtomService
  componentService: IComponentService
  renderType: RenderType | null
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
