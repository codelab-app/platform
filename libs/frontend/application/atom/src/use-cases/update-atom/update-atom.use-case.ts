import type { IUpdateAtomData } from '@codelab/frontend/abstract/domain'
import { updateAtomRepository } from '@codelab/frontend-domain-atom/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { assertIsDefined } from '@codelab/shared/utils'

export const useUpdateAtomUseCase = async (data: IUpdateAtomData) => {
  const { atomDomainService } = useDomainStore()
  const atom = atomDomainService.atoms.get(data.id)

  assertIsDefined(atom)

  atom.writeCache({
    ...data,
    requiredParents: data.requiredParents?.map((child) => ({ id: child.id })),
    suggestedChildren: data.suggestedChildren?.map((child) => ({
      id: child.id,
    })),
  })

  await updateAtomRepository()
}
