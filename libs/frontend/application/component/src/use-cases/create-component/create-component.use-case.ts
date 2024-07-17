import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import { revalidateComponentListOperation } from '../component-list'
import { createComponentAction } from './create-component.action'

export const createComponentUseCase = async (
  componentData: ICreateComponentData,
  { componentDomainService }: IDomainStore,
) => {
  const componentModel = componentDomainService.add({
    id: componentData.id,
    name: componentData.name,
  })

  await createComponentAction(componentModel.toCreateInput())
  await revalidateComponentListOperation()
}
