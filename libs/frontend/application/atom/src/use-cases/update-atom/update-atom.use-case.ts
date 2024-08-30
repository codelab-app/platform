import type { IUpdateAtomData } from '@codelab/frontend/abstract/domain'
import { updateAtomRepository } from '@codelab/frontend-domain-atom/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'

export const useUpdateAtomUseCase = async (data: IUpdateAtomData) => {
  const { atomDomainService } = useDomainStore()
  const atom = atomDomainService.atoms.get(data.id)

  Validator.assertsDefined(atom)

  atom.writeCache({
    ...data,
    requiredParents: data.requiredParents?.map((child) => ({ id: child.id })),
    suggestedChildren: data.suggestedChildren?.map((child) => ({
      id: child.id,
    })),
  })

  await updateAtomRepository()
}
