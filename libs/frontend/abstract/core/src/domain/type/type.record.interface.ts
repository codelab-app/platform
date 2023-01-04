import type { ITypeKind } from '@codelab/shared/abstract/core'

export interface ITypeRecord {
  id: string
  name: string
  kind: ITypeKind
}

export interface IUnionTypeRecord {
  id: string
  name: string
  kind: string
}

export interface IEnumTypeRecord {
  id: string
  key: string
  value: string
}
