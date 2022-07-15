import { Nullish } from '@codelab/shared/abstract/types'

export const tryParse = (str: Nullish<string>) => {
  try {
    return JSON.parse(str || '{}')
  } catch (error) {
    console.log(error)

    return str
  }
}
