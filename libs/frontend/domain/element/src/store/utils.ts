import type { IAtom, IComponent } from '@codelab/frontend/abstract/core'
import { atomRef, componentRef } from '@codelab/frontend/abstract/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

export const getRenderType = (
  renderType: IElementDTO['renderType'],
): Ref<IAtom> | Ref<IComponent> | null => {
  if (renderType?.kind === IRenderTypeKind.Atom) {
    return atomRef(renderType.id)
  }

  if (renderType?.kind === IRenderTypeKind.Component) {
    return componentRef(renderType.id)
  }

  return null
}

export const jsonStringToCss = (json: string | null | undefined) => {
  const jsonObject = JSON.parse(json ?? '{}')
  let css = ''

  for (const key in jsonObject) {
    css += `${key}: ${jsonObject[key]};`
  }

  return css
}

/**
 * @param cssString user-defined css string
 * @returns new string without trailing spaces and new lines
 */
const replaceNewLineAndSpaces = (cssString: string) => {
  cssString = cssString.trim()
  cssString = cssString.replace(/\n/g, ' ')
  cssString = cssString.replace(/\s+/g, ' ')

  return cssString
}

/**
 * @param cssString user-defined css string
 * @param startIndex starting index of the css string where to look for rule key
 * @returns rule "key", like "color" or "margin-top", and the index of the last character of the key
 */
const getStyleKey = (cssString: string, startIndex: number) => {
  let index = startIndex
  let key = ''
  let stopSymbol = ''

  while (index < cssString.length) {
    const char = cssString[index++]

    if (char === ':') {
      let index2 = index + 1
      let shouldStop = false

      while (index2 < cssString.length) {
        const char2 = cssString[index2++]

        if (char2 === '{') {
          shouldStop = false
          break
        }

        if (char2 === ';') {
          shouldStop = true
          break
        }
      }

      if (shouldStop) {
        stopSymbol = char
        break
      }
    }

    if (char === '{') {
      stopSymbol = char
      break
    }

    key += char
  }

  key = key.trim()

  return { endIndex: index - 1, key, stopSymbol }
}

const getStyleValue = (
  str: string,
  startIndex: number,
  keyStopSymbol: string,
) => {
  let index = startIndex
  let value = ''
  const stopSymbol = keyStopSymbol === '{' ? '}' : ';'

  while (index < str.length) {
    const char = str[index++]

    if (char === stopSymbol) {
      break
    }

    value += char
  }

  value = value.trim()

  return { endIndex: index - 1, value }
}

/**
 * @param str user-defined css string
 * @param startIndex starting index of the css string where to look for the end of the block
 * @returns index of the last character of the block
 */
const findEndOfBlockIndex = (str: string, startIndex: number) => {
  const stack = []

  for (let i = startIndex; i < str.length; i++) {
    const char = str[i]

    if (char === '{') {
      stack.push(char)
      continue
    }

    if (char === '}') {
      stack.pop()

      if (stack.length === 0) {
        return i
      }
    }
  }

  return str.length
}

/**
 * @param cssString user-defined css string
 * @returns parsed css object based on any given css string
 */
export const parseCssStringIntoObject = (cssString: string) => {
  const trimmedCssString = replaceNewLineAndSpaces(cssString)
  const result = {} as Record<string, unknown>
  let index = 0

  while (index < trimmedCssString.length) {
    const { endIndex, key, stopSymbol } = getStyleKey(trimmedCssString, index)

    if (stopSymbol === '{') {
      const endOfBlockIndex = findEndOfBlockIndex(trimmedCssString, index)

      index = endOfBlockIndex + 1

      const nestedBlockStr = trimmedCssString.substring(
        endIndex + 1,
        endOfBlockIndex,
      )

      const value = parseCssStringIntoObject(nestedBlockStr)

      result[key] = value
    } else {
      const { endIndex: endIndex2, value } = getStyleValue(
        trimmedCssString,
        endIndex + 1,
        stopSymbol,
      )

      index = endIndex2 + 1

      result[key] = value
    }
  }

  return result
}
