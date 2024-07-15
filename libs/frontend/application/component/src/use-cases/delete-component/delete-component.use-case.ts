import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { Component } from '@codelab/frontend-domain-component/store'
import { deleteElementRepository } from '@codelab/frontend-domain-element/actions'
import { refreshComponentListAction } from '../component-list'
import { deleteComponentRepository } from './delete-component.repository'

export const deleteComponentUseCase = async (component: IComponentModel) => {
  await deleteElementRepository({ parentComponent: { id: component.id } })
  await deleteComponentRepository(
    { id: component.id },
    Component.toDeleteInput(),
  )
  await refreshComponentListAction()
}
