import { IBuildable } from './i-query-builder'

export const compileMultiple = (
  buildables?: Array<IBuildable | string>,
  prefix?: string,
  postfix?: string,
) => {
  if (!buildables || !buildables.length) {
    return ''
  }

  let compilation = ''

  for (const buildable of buildables) {
    compilation +=
      typeof buildable === 'string' ? buildable + ' ' : buildable.build() + ' '
  }

  return ` ${prefix || ''} ${compilation.trim()} ${postfix || ''} `
}
