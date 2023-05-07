import type { IFieldDTO, ITypeDTO } from '@codelab/frontend/abstract/core'

export interface ITypesExport {
  fields: Array<IFieldDTO>
  types: Array<ITypeDTO>
}
