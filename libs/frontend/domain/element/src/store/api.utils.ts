import type {
  IAtomService,
  IComponentService,
  IElementModel,
  IFieldDefaultValue,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import type { ElementUpdateInput } from '@codelab/shared/abstract/codegen'
import type { ElementRenderType } from '@codelab/shared/abstract/core'
import { ElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { isNil } from 'ramda'

//
// Utilities for transforming the form inputs to api inputs
//
export const makeUpdateElementInput = (
  element: Pick<IElementModel, 'id'>,
  input: ElementUpdateInput,
) => ({
  update: input,
  where: { id: element.id },
})

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
