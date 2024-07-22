import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  filterAtoms,
  mapAtomOptions,
} from '@codelab/frontend-domain-atom/store'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useAtomOptionsList = (
  atoms: Array<IAtomDto>,
  parent?: IAtomModel,
) => {
  const { atomDomainService } = useDomainStore()
  const atomsList = atomDomainService.atomsList
  const atomOptions = parent ? filterAtoms(atomsList, parent) : atomsList

  useEffect(() => {
    atoms.forEach((atom) => atomDomainService.hydrate(atom))
  }, [atomDomainService, atoms])

  return atomOptions.map(mapAtomOptions)
}
