import type {
  IElementModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import type { IFieldDefaultValue } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ElementUpdateInput } from '@codelab/shared/infra/gql'
import { isNullish } from 'remeda'

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
      if (!isNullish(field.defaultValues)) {
        acc[field.key] = field.defaultValues
      }

      return acc
    },
    {},
  )

  return JSON.stringify(defaultProps)
}
