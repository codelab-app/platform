import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import { createComponentRepository } from '@codelab/frontend-domain-component/repositories'
import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import { revalidateComponentListOperation } from '../component-list'

export const createComponentUseCase = async (
  componentData: ICreateComponentData,
  { componentDomainService }: IDomainStore,
) => {
  const componentModel = componentDomainService.add({
    id: componentData.id,
    name: componentData.name,
  })

  await createComponentRepository(componentModel)
  await revalidateComponentListOperation()
}
