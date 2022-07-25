import { Nullable } from '@codelab/shared/abstract/types'

const cssPropUnitRegExp = new RegExp(/[a-z]+|%/)

export const matchCssPropUnit = (str: string): Nullable<string> => {
  return cssPropUnitRegExp.exec(str)?.[0] ?? null
}
