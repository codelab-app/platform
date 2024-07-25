import { useDomainStore } from '@codelab/frontend/infra/mobx'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import { useEffect } from 'react'

export const useAtomsList = (atoms: Array<IAtomDto>) => {
  const { atomDomainService } = useDomainStore()

  useEffect(() => {
    atoms.forEach((atom) => atomDomainService.hydrate(atom))
  }, [atomDomainService, atoms])

  return atomDomainService.atomsList
}
