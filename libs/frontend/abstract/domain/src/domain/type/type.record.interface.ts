import type { ITypeKind } from '@codelab/shared/abstract/core'

export interface ITypeRecord {
  id: string
  kind: ITypeKind
  name: string
}

export interface IUnionTypeRecord {
  id: string
  kind: string
  name: string
}

export interface IEnumTypeRecord {
  id: string
  key: string
  value: string
}
