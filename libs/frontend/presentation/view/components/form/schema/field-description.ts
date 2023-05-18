import type { Maybe } from '@codelab/shared/abstract/types'

interface FieldDescription {
  help: Maybe<string>
}

/**
 * Use this function to add a description for any uniforms field by
 * destructing its return into the json schema property.
 */
export const fieldDescription = (description: string): FieldDescription => {
  return {
    help: description,
  }
}
