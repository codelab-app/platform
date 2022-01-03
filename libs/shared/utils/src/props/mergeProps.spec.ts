import { mergeProps } from './mergeProps'

describe('MergeProps', () => {
  it('should concat className', () => {
    const propsA = {
      className: 'classA',
      propA01: 'propA01',
      prop02: {
        nested: 'propA02',
      },
    }

    const propsB = {
      className: 'classB',
      propB01: 'propB01',
      prop02: {
        nested: 'propB02',
      },
    }

    const merged = {
      prop02: {
        nested: 'propB02',
      },
      propB01: 'propB01',
      propA01: 'propA01',
      className: ' classA classB',
    }

    expect(mergeProps(propsA, propsB)).toEqual(merged)
  })
})
