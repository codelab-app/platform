import { ElementSchema, IElement } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { z } from 'zod'
import { defaultElementName } from './defaultElementName'

export type ICreateElementInput = z.input<typeof ElementSchema>

/**
 * Creates a Codelab element with a random fixedId and a default name if not provided
 */
export const createElement = (input: ICreateElementInput): IElement => {
  const element = ElementSchema.parse(input)

  if (!element.fixedId) {
    element.fixedId = v4()
  }

  element.name = defaultElementName(element)

  return element
}
