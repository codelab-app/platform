import {
  IAtomDTO,
  IAtomService,
  IInterfaceTypeRef,
  ITag,
} from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'

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
}

export type ActionColumnProps = {
  atomService: IAtomService
} & AtomRecordProps

/**
 * Passed as 2nd argument in table render function, shared across columns
 */
export interface AtomRecordProps {
  atom: AtomRecord
}
