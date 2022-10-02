import {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { IPropData } from '../prop'
import { TypeFragment } from './fragments'
import { IEnumTypeValue } from './types'

export interface IBaseTypeDTO {
  id: string
  name: string
  kind: ITypeKind
  primitiveKind?: IPrimitiveTypeKind
  elementKind?: IElementTypeKind
  language?: ICodeMirrorLanguage
  allowedValues?: Array<IEnumTypeValue>
  unionTypeIds?: Array<string>
  arrayTypeId?: string
  interfaceDefaults?: { data: IPropData; auth0Id: string }
}

/**
 * Create
 */
export interface ICreateTypeDTO
  extends Omit<IBaseTypeDTO, 'interfaceDefaults'> {
  auth0Id: string
}

/**
 * Update
 */
export type IUpdateTypeDTO = IBaseTypeDTO

export type ITypeDTO = TypeFragment
