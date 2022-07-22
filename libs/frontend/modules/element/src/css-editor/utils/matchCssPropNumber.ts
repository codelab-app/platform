import { Nullable } from '@codelab/shared/abstract/types'

const cssPropNumberRegExp = new RegExp(/[0-9]+\.?([0-9]+)?/)

export const matchCssPropNumber = (str: string): Nullable<number> => {
  const match = cssPropNumberRegExp.exec(str)?.[0]

  if (match) {
    return parseFloat(match)
  }

  return null
}
