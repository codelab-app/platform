import type { ObjectLike } from '@codelab/shared-abstract-types'

export const jsonStringToCss = (json: string | null | undefined) => {
  const jsonObject = JSON.parse(json ?? '{}')
  let css = ''

  for (const key in jsonObject) {
    css += `${key}: ${jsonObject[key]};`
  }

  return css
}

/**
 * Normalize the css string by removing new lines and compressing spaces
 */
const normalizeCssString = (cssString: string): string =>
  cssString.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ')

/**
 * finds key in css string, which could be a css rule (e.g. "color" or "margin-top")
 * or a nested selector (e.g. "span::hover" or "*::after")
 */
const extractStyleKey = (cssString: string, startIndex: number) => {
  let endIndex = startIndex

  while (endIndex < cssString.length) {
    const char = cssString[endIndex++]

    if (char === ':') {
      const indexOfBracket = cssString.indexOf('{', endIndex)
      const indexOfColon = cssString.indexOf(';', endIndex)

      if (
        indexOfColon !== -1 &&
        (indexOfColon < indexOfBracket || indexOfBracket === -1)
      ) {
        break
      }
    }

    if (char === '{') {
      break
    }
  }

  return { endIndex, key: cssString.substring(startIndex, endIndex - 1).trim() }
}

/**
 * finds value in css string, which could be a css rule value (e.g. "50px" or "orange")
 * or a nested block of rules that needs to be parsed recursively (e.g. "p: { color: orange; }")
 */
const extractStyleValue = (cssString: string, startIndex: number) => {
  if (cssString[startIndex - 1] === '{') {
    const endOfBlockIndex = findEndOfBlockIndex(cssString, startIndex)
    const nestedBlockStr = cssString.substring(startIndex + 1, endOfBlockIndex)
    const value = parseCssStringIntoObject(nestedBlockStr)

    return { endIndex: endOfBlockIndex + 1, value }
  } else {
    const endIndex = Math.max(cssString.indexOf(';', startIndex), startIndex)
    const value = cssString.substring(startIndex, endIndex).trim()

    return { endIndex: endIndex + 1, value }
  }
}

/**
 * finds the closing bracket index of a nested block of rules
 * fot the string "p: { color: orange; }" it would return 19, index of "}"
 */
const findEndOfBlockIndex = (cssString: string, startIndex: number): number => {
  let depth = 1

  for (let i = startIndex + 1; i < cssString.length; i++) {
    if (cssString[i] === '{') {
      depth++
    } else if (cssString[i] === '}') {
      depth--
    }

    if (depth === 0) {
      return i
    }
  }

  return cssString.length
}

/**
 * @param cssString user-defined css string
 * @returns parsed css object based on any given css string
 */
export const parseCssStringIntoObject = (cssString: string): ObjectLike => {
  const normalizedCss = normalizeCssString(cssString)
  const result: ObjectLike = {}
  let index = 0

  while (index < normalizedCss.length) {
    const keyInfo = extractStyleKey(normalizedCss, index)
    const valueInfo = extractStyleValue(normalizedCss, keyInfo.endIndex)

    result[keyInfo.key] = valueInfo.value
    index = valueInfo.endIndex
  }

  return result
}
