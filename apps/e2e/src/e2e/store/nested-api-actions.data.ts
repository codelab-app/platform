import type {
  ICreateApiActionData,
  ICreateCodeActionData,
  ICreateElementData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
  IAtomType,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { createResourceData } from './resource.data'

// TODO: there must be a better way to do this
// When selecting an action via UI, this id is for the system type ActionType and is saved as the `type` in
// the typed object i.e. { kind: 'ActionType', type: '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f', value: 'api-action-id' }
const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'

export const stateKey = 'stateKey'
export const apiGetActionUrlSegment = '/data/some-id'
export const apiPostActionUrlSegment = '/data'

export const successCodeActionCreateData = (
  page: IPageDto,
): ICreateCodeActionData => ({
  code: `function run() { state.${stateKey} = 'success'; }`,
  id: 'success-code-action-id',
  name: 'Success Action',
  storeId: page.store.id,
  type: IActionKind.CodeAction,
})

export const errorCodeActionCreateData = (
  page: IPageDto,
): ICreateCodeActionData => ({
  code: `function run() { state.${stateKey} = 'error'; }`,
  id: 'error-code-action-id',
  name: 'Error Action',
  storeId: page.store.id,
  type: IActionKind.CodeAction,
})

export const apiGetActionCreateData = (
  page: IPageDto,
): ICreateApiActionData => ({
  config: {
    data: {
      method: HttpMethod.GET,
      responseType: HttpResponseType.Text,
      urlSegment: apiGetActionUrlSegment,
    },
    id: v4(),
  },
  errorActionId: 'error-code-action-id',
  id: 'api-get-action-id',
  name: 'On Fetch Data',
  resource: createResourceData,
  storeId: page.store.id,
  successActionId: 'success-code-action-id',
  type: IActionKind.ApiAction,
})

export const apiPostActionCreateData = (
  page: IPageDto,
): ICreateApiActionData => ({
  config: {
    data: {
      method: HttpMethod.POST,
      responseType: HttpResponseType.Json,
      urlSegment: apiPostActionUrlSegment,
    },
    id: v4(),
  },
  id: 'api-post-action-id',
  name: 'On Create Data',
  resource: createResourceData,
  storeId: page.store.id,
  successActionId: 'api-get-action-id',
  type: IActionKind.ApiAction,
})

export const textElementCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Content',
  propsData: {
    children: `response from api - {{state.${stateKey}}}`,
  },
}

export const buttonElementCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Post Button',
  prevSibling: textElementCreateData,
  propsData: {
    children: 'Click button to post',
    onClick: {
      kind: ITypeKind.ActionType,
      type: actionTypeId,
      value: 'api-post-action-id',
    },
  },
}

export const providerPageElements = (
  page: IPageDto,
): Array<ICreateElementData> => [
  {
    ...textElementCreateData,
    parentElement: page.rootElement,
  },
  buttonElementCreateData,
]
