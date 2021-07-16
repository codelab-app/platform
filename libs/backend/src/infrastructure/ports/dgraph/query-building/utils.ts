import { IBuildable } from './i-query-builder'

export interface CompileMultipleOptions {
  /** Will be inserted before the final compiled string */
  prefix?: string
  /** Will be inserted after the final compiled string */
  postfix?: string
  /** Will insert new lines between items, defaults to true */
  multiline?: boolean
  /** Use this to plug in to the loop */
  forEach?: (item: IBuildable | string) => void
}

export const compileMultiple = (
  buildables?: Array<IBuildable | string>,
  options?: CompileMultipleOptions,
) => {
  if (!buildables || !buildables.length) {
    return ''
  }

  let compilation = ''

  for (const buildable of buildables) {
    const addition =
      typeof buildable === 'string' ? buildable + ' ' : buildable.build() + ' '

    compilation = options?.multiline
      ? `
      ${compilation}
      ${addition}
    `
      : compilation + addition

    if (options?.forEach) {
      options.forEach(buildable)
    }
  }

  return ` ${options?.prefix || ''} ${compilation.trim()} ${
    options?.postfix || ''
  } `
}
