import type {
  IAtomService,
  IFieldService,
  IInterfaceType,
  ITag,
} from '@codelab/frontend/abstract/core'
import type { IAtomDTO, IAtomType } from '@codelab/shared/abstract/core'

export interface AtomLibrary {
  color: string
  name: string
}

export interface AtomRecord {
  api: IInterfaceType
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  id: string
  library: AtomLibrary
  name: string
  requiredParents: Array<Pick<IAtomDTO, 'id' | 'name'>>
  suggestedChildren: Array<Pick<IAtomDTO, 'id' | 'name'>>
  tags: Array<ITag>
  type: IAtomType
}

export type ActionColumnProps = AtomRecordProps & {
  atomService: IAtomService
}

export type PropsColumnProps = AtomRecordProps & {
  fieldService: IFieldService
}

/**
 * Passed as 2nd argument in table render function, shared across columns
 */
export interface AtomRecordProps {
  atom: AtomRecord
}
