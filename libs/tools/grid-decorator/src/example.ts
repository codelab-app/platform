import { grid } from './gridDecorator'

export const testDec = (
  str: string,
  num: number,
  nestObj: { nest: { a: number } },
  arr: Array<any>,
): any => {
  /**
   * empty decorator
   * we use it for:
   * 1. params type checking
   * 2. pass grid metadata to the generator
   * */
}

class DemoGrid {
  @grid({ order: 1, span: 12 })
  @testDec('testString', 1, { nest: { a: 2 } }, [1, 'str'])
  email1 = ''

  @grid({ order: 0, span: 16 })
  password0 = ''

  @grid({ order: 2, span: 8 })
  name2 = ''

  notGroupedField = ''
}
