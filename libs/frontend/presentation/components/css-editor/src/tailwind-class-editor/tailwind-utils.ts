'use client'

import { tailwindClasses, tailwindColors } from './tailwind-classes'

export const getValidTailwindClasses = (prefix: string): Array<string> => {
  if (!prefix) {
    return tailwindClasses.slice(20)
  }

  // to support arbitrary value like "p-[10px]"
  if (/\[.*\]/.test(prefix)) {
    return [prefix]
  }

  return tailwindClasses.filter((className) => className.startsWith(prefix))
}

export const isColorClass = (className: string) => {
  return tailwindColors.some((color) => String(className).includes(color))
}

export const getOnlyColorValue = (value: string) => {
  if (!isColorClass(value)) {
    return ''
  }

  const regex = new RegExp(`(${tailwindColors.join('|')})-([0-9]+)`)
  const match = value.match(regex)

  if (match) {
    const colorMatched = match[1]
    const numberMatched = match[2]

    return `${colorMatched}-${numberMatched}`
  }

  return ''
}

interface IVariantResult {
  className: string
  variant: string
}

export const extractVariant = (input: string): IVariantResult => {
  // Trim the input string
  const trimmedInput = input.trim()
  // Match the pattern and extract the required portion
  // Modified regex to capture up to the last colon
  const match = trimmedInput.match(/^(.*?):(?=[^:]+$)/)

  if (match) {
    return {
      className: trimmedInput.slice(match[0].length),
      variant: match[1] + ':',
    }
  }

  return {
    className: trimmedInput,
    variant: '',
  }
}
