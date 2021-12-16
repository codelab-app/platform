import { pascalCaseToWords } from '@codelab/shared/utils'
import { z } from 'zod'
import { ElementSchema, IElement } from './element.interface'

export type ICreateElementInput = z.input<typeof ElementSchema>

export const createElement = (input: ICreateElementInput): IElement => {
  const element = ElementSchema.parse(input)

  if (!element.name && element.atom?.type) {
    element.name = pascalCaseToWords(element.atom.type)
  }

  return element
}
