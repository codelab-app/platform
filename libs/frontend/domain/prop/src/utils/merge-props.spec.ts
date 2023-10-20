import { mergeProps } from './merge-props'

describe('MergeProps', () => {
  it('should concat className', () => {
    const propsA = {
      className: 'classA',
      prop02: {
        nested: 'propA02',
      },
      propA01: 'propA01',
    }

    const propsB = {
      className: 'classB',
      prop02: {
        nested: 'propB02',
      },
      propB01: 'propB01',
    }

    const merged = {
      className: ' classA classB',
      prop02: {
        nested: 'propB02',
      },
      propA01: 'propA01',
      propB01: 'propB01',
    }

    expect(mergeProps(propsA, propsB)).toEqual(merged)
  })
})
