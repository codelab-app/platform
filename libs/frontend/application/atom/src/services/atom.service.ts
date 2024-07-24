import type { ITypeService } from '@codelab/frontend/abstract/application'
import type {
  IAtomDomainService,
  ITypeRepository,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'

export const useAtomService = (typeService: ITypeService) => {
  const { atomDomainService } = useDomainStore()

  const loadApi = async (id: string) => {
    const atom = atomDomainService.atoms.get(id)
    const interfaceTypeId = atom?.api.id

    if (interfaceTypeId) {
      await typeService.getAll([interfaceTypeId])
    }
  }

  return {
    loadApi,
  }
}
