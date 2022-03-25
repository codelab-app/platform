import { MonacoLanguage } from '@codelab/shared/abstract/codegen-v2'
import {
  IAnyType,
  IEnumType,
  IMonacoType,
  IUnionType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { entityRecordById } from '@codelab/shared/utils'
import { getPropsByTypeKind } from './getPropsByTypeKind'

const enumType: IEnumType = {
  name: 'EnumType',
  typeKind: TypeKind.EnumType,
  allowedValues: [],
  owner: null,
  id: '0x123',
}

const monacoType: IMonacoType = {
  name: 'MonacoType',
  typeKind: TypeKind.MonacoType,
  language: MonacoLanguage.typescript,
  owner: null,
  id: '0x124',
}

const unionType: IUnionType = {
  name: 'UnionType',
  typeKind: TypeKind.UnionType,
  typesOfUnionType: [],
  owner: null,
  id: '0x125',
}

const types = [enumType, monacoType, unionType]
const typesById: Record<string, IAnyType> = entityRecordById(types)

const initialProps = {
  prop01: { type: enumType.id, value: 'prop01-value' },
  prop02: { type: monacoType.id, value: 'prop02-value' },
  prop03: { type: unionType.id, value: 'prop03-value' },
}

describe('GetPropsByTypeKind', () => {
  it('should filter props with typeKind', () => {
    expect(
      getPropsByTypeKind(initialProps, TypeKind.UnionType, typesById),
    ).toStrictEqual({ prop03: initialProps.prop03 })
  })
})
