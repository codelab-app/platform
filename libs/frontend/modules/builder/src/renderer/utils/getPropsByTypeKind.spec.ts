import { TypeKind } from '@codelab/shared/abstract/core'
import { getPropsByTypeKind } from './getPropsByTypeKind'

const initialProps = {
  prop01: {
    typeKind: TypeKind.EnumType,
    value: 'prop01-value',
  },
  prop02: {
    typeKind: TypeKind.MonacoType,
    value: 'prop02-value',
  },
  prop03: {
    typeKind: TypeKind.UnionType,
    value: 'prop03-value',
  },
}

describe('GetPropsByTypeKind', () => {
  it('should filter props with typeKind', () => {
    expect(getPropsByTypeKind(initialProps, TypeKind.UnionType)).toStrictEqual({
      prop03: {
        typeKind: TypeKind.UnionType,
        value: 'prop03-value',
      },
    })
  })
})
