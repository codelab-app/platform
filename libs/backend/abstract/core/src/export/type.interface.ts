import type { IFieldDTO, ITypeDTO } from '@codelab/shared/abstract/core'

export interface ITypesExport {
  fields: Array<IFieldDTO>
  types: Array<ITypeDTO>
}
