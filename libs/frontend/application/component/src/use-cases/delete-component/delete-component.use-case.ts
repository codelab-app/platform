import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { deleteComponentRepository } from '@codelab/frontend-domain-component/repositories'
import { Component } from '@codelab/frontend-domain-component/store'
import { deleteElementRepository } from '@codelab/frontend-domain-element/repositories'
import { refreshComponentListAction } from '../component-list'

export const deleteComponentUseCase = async (component: IComponentModel) => {
  await deleteElementRepository({
    where: { parentComponent: { id: component.id } },
  })
  await deleteComponentRepository(
    { id: component.id },
    Component.toDeleteInput(),
  )
  await refreshComponentListAction()
}
