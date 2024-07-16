import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { deleteElementRepository } from '@codelab/frontend-application-element/use-cases/delete-element'
import { Component } from '@codelab/frontend-domain-component/store'
import { refreshComponentListAction } from '../component-list'
import { deleteComponentRepository } from './delete-component.repository'

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
