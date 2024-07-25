import type { IAtomService } from '@codelab/frontend/abstract/application'
import type { IUpdateAtomData } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { updateAtomRepository } from '@codelab/frontend-domain-atom/repositories'
import { assertIsDefined } from '@codelab/shared/utils'

export const useUpdateAtomAction: IAtomService['update'] = async (
  data: IUpdateAtomData,
) => {
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

  await updateAtomRepository(atom)

  return atom
}
