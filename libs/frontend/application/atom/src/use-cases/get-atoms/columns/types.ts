import type {
  IAtomService,
  IFieldService,
  IInterfaceType,
  ITagModel,
} from '@codelab/frontend/abstract/domain'
import type { IAtomDTO, IAtomType } from '@codelab/shared/abstract/core'
import type { ReactNode } from 'react'

export interface AtomLibrary {
  color: string
  icon?: ReactNode
  name: string
}

export interface AtomRecord {
  api: IInterfaceType | undefined
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  id: string
  library: AtomLibrary
  name: string
  requiredParents: Array<Pick<IAtomDTO, 'id' | 'name'>>
  suggestedChildren: Array<Pick<IAtomDTO, 'id' | 'name'>>
  tags: Array<ITagModel>
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