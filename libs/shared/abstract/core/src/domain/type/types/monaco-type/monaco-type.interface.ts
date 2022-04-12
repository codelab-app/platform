import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

export interface IMonacoType extends IBaseType {
  typeKind: typeof TypeKind.MonacoType
  language: MonacoLanguage
}
