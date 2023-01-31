import { interfaceTypeParser } from './interface-type-parser'

describe('InterfaceType parser', () => {
  it('turns a string into interface type data', () => {
    // Progress.success
    const actual = '{ percent: number, strokeColor: string }'

    expect(interfaceTypeParser(actual)).toStrictEqual([
      ['percent', 'number'],
      ['strokeColor', 'string'],
    ])
  })

  it('turns a string into interface type data', () => {
    // Progress.success
    const actual = '{ ghost: boolean }'

    expect(interfaceTypeParser(actual)).toStrictEqual([['ghost', 'boolean']])
  })

  it('turns a string into InterfaceType data', () => {
    // ConfigProvider.space
    const actual = '{ size: small | middle | large | number }'

    expect(interfaceTypeParser(actual)).toStrictEqual([
      ['size', 'small|middle|large|number'],
    ])
  })
})
