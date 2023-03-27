import type { IComponent, IPropData } from '@codelab/frontend/abstract/core'

/**
 * Generates a key-value pair from the api fields of an IComponent
 */
export const getDefaultComponentFieldProps = (component: IComponent) => {
  const props = component.api.maybeCurrent?.fields.reduce<IPropData>(
    (acc, field) => {
      acc[field.key] = field.defaultValues

      return acc
    },
    {},
  )

  return props
}
