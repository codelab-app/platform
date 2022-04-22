import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { IBaseType } from '../base-type/base-type.interface'
import { ITypeKind } from '../base-type/type-kind.enum'

export interface IMonacoType extends IBaseType {
  kind: ITypeKind.MonacoType
  language: MonacoLanguage
}
