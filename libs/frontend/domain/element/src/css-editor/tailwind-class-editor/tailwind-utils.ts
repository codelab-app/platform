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
