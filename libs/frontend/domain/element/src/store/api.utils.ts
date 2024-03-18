import type {
  IElementModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import type { ElementUpdateInput } from '@codelab/shared/abstract/codegen'
import type { IFieldDefaultValue } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
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
export const makeDefaultProps = (typeApi: Maybe<IInterfaceTypeModel>) => {
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
