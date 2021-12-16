import { v4 } from 'uuid'
import { z } from 'zod'
import { ElementSchema, IElement } from '../element.interface'
import { defaultElementName } from './defaultElementName'

export type ICreateElementInput = z.input<typeof ElementSchema>

export const createElement = (input: ICreateElementInput): IElement => {
  const element = ElementSchema.parse(input)

  if (!element.fixedId) {
    element.fixedId = v4()
  }

  element.name = defaultElementName(element)

  return element
}
