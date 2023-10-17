import type { Nullish } from '@codelab/shared/abstract/types'

export const tryParse = (str: Nullish<string>) => {
  try {
    return JSON.parse(str || '{}')
  } catch (error) {
    console.log(error)

    // to prevent passing wrong value since the expected output is a parsed JSON
    return undefined
  }
}
