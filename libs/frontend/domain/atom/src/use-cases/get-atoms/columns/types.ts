import type {
  IAtomDTO,
  IAtomService,
  IFieldService,
  IInterfaceTypeRef,
  ITag,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

export interface AtomLibrary {
  name: string
  color: string
}

export interface AtomRecord {
  id: string
  name: string
  type: IAtomType
  tags: Array<ITag>
  apiId: IInterfaceTypeRef
  library: AtomLibrary
  allowedChildren: Array<Pick<IAtomDTO, 'id' | 'name'>>
  requiredParent: Nullish<Pick<IAtomDTO, 'id' | 'name'>>
}

export type ActionColumnProps = {
  atomService: IAtomService
} & AtomRecordProps

export type PropsColumnProps = {
  fieldService: IFieldService
  typeService: ITypeService
} & AtomRecordProps

/**
 * Passed as 2nd argument in table render function, shared across columns
 */
export interface AtomRecordProps {
  atom: AtomRecord
}
