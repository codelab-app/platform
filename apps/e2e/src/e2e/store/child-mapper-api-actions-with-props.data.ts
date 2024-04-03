import type {
  IComponentDto,
  ICreateApiActionData,
  ICreateComponentData,
  ICreateElementData,
  IPageDto,
  IRef,
} from '@codelab/shared/abstract/core'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
  IAtomType,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { createResourceData } from '../preview/resource.data'

// TODO: there must be a better way to do this
// When selecting an action via UI, this id is for the system type ActionType and is saved as the `type` in
// the typed object i.e. { kind: 'ActionType', type: '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f', value: 'api-action-id' }
const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'
const apiActionId = 'api-action-id'

export const childMapperData = [
  {
    id: 'data-id-1',
    name: 'Data Name 1',
  },
  {
    id: 'data-id-2',
    name: 'Data Name 2',
  },
  {
    id: 'data-id-3',
    name: 'Data Name 3',
  },
]

export const componentCreateData: ICreateComponentData = {
  id: v4(),
  name: 'Fetch Data Button',
}

export const componentElementCreateData = (
  component: IComponentDto,
): ICreateElementData => ({
  atom: IAtomType.AntDesignButton,
  id: v4(),
  name: 'Fetch Data',
  parentElement: component.rootElement,
  propsData: {
    customText: 'Name of data - {{ componentProps.name }}',
    onClick: {
      kind: ITypeKind.ActionType,
      type: actionTypeId,
      value: apiActionId,
    },
  },
})

export const providerPageElementCreateData = (
  page: IPageDto,
): ICreateElementData => ({
  atom: IAtomType.ReactFragment,
  childMapperComponent: componentCreateData,
  childMapperPropKey: `{{${JSON.stringify(childMapperData)}}}`,
  id: v4(),
  name: 'Fetch Buttons Container',
  parentElement: page.rootElement,
})

export const apiActionCreateData = (store: IRef): ICreateApiActionData => ({
  config: {
    data: {
      method: HttpMethod.GET,
      responseType: HttpResponseType.Text,
      urlSegment: '/data/{{componentProps.id}}',
    },
    id: v4(),
  },
  id: apiActionId,
  name: 'On Fetch Data',
  resource: { id: createResourceData.id },
  storeId: store.id,
  type: IActionKind.ApiAction,
})
