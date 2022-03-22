import { attempt, isError } from 'lodash'

export const evalCss = (cssString: string) => {
  // eslint-disable-next-line no-eval
  const result = attempt(eval, `\`${cssString}\``)

  if (isError(result)) {
    console.warn(`Couldn't parse css`, cssString, result)
  }

  return result
}
