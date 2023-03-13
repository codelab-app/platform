import type {
  IAtomDTO,
  IAtomService,
  IFieldService,
  IInterfaceTypeRef,
  ITag,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'

export interface AtomLibrary {
  color: string
  name: string
}

export interface AtomRecord {
  allowedChildren: Array<Pick<IAtomDTO, 'id' | 'name'>>
  apiId: IInterfaceTypeRef
  id: string
  library: AtomLibrary
  name: string
  tags: Array<ITag>
  type: IAtomType
}

export type ActionColumnProps = AtomRecordProps & {
  atomService: IAtomService
}

export type PropsColumnProps = AtomRecordProps & {
  fieldService: IFieldService
  typeService: ITypeService
}

/**
 * Passed as 2nd argument in table render function, shared across columns
 */
export interface AtomRecordProps {
  atom: AtomRecord
}
