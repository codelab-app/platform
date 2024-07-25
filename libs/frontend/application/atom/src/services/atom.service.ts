import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { useTypeService } from '@codelab/frontend-application-type/services'

export const useAtomService = () => {
  const typeService = useTypeService()
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
