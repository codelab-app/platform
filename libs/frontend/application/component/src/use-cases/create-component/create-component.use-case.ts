import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import { refreshComponentListAction } from '../component-list'
import { createComponentAction } from './create-component.action'

export const createComponentUseCase = async (
  componentData: ICreateComponentData,
  { componentDomainService }: IDomainStore,
) => {
  const componentModel = componentDomainService.create({
    id: componentData.id,
    name: componentData.name,
  })

  await createComponentAction(componentModel.toCreateInput())
  await refreshComponentListAction()
}
