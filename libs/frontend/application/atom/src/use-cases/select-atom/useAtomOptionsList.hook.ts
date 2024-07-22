import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  filterAtoms,
  mapAtomOptions,
} from '@codelab/frontend-domain-atom/store'

export const useAtomOptionsList = (parent?: IAtomModel) => {
  const { atomDomainService } = useDomainStore()
  const atomsList = atomDomainService.atomsList
  const atomOptions = parent ? filterAtoms(atomsList, parent) : atomsList

  return atomOptions.map(mapAtomOptions)
}
