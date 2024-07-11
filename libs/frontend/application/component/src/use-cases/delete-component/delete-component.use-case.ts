import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { Component } from '@codelab/frontend-domain-component/store'
import { deleteElementAction } from '@codelab/frontend-domain-element/actions'
import { refreshComponentListAction } from '../component-list'
import { deleteComponentAction } from './delete-component.action'

export const deleteComponentUseCase = async (component: IComponentModel) => {
  await deleteElementAction({ parentComponent: { id: component.id } })
  await deleteComponentAction({ id: component.id }, Component.toDeleteInput())
  await refreshComponentListAction()
}
