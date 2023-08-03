import type {
  IAtom,
  IComponent,
  IPropData,
} from '@codelab/frontend/abstract/core'
import isNil from 'lodash/isNil'

/**
 * Generates a key-value pair from the api fields
 * of an IComponent/IAtom with their defaultValues
 */
export const getDefaultFieldProps = (component: IAtom | IComponent) => {
  const props = component.api.maybeCurrent?.fields.reduce<IPropData>(
    (acc, field) => {
      if (!isNil(field.defaultValues)) {
        acc[field.key] = field.defaultValues
      }

      return acc
    },
    {},
  )

  return props
}
