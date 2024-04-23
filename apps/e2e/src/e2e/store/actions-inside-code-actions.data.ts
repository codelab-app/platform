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
import { systemTypesIds } from '../system-types.data'
import { createResourceData } from './resource.data'

// TODO: there must be a better way to do this
// When selecting an action via UI, this id is for the system type ActionType and is saved as the `type` in
// the typed object i.e. { kind: 'ActionType', type: '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f', value: 'api-action-id' }
const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'
const nestedActionName = 'nestedAction'
const apiActionName = 'apiAction'
const onClickActionId = 'on-click-action-id'

export const stateKey1 = 'stateKey1'
export const stateKey2 = 'stateKey2'
export const apiUrlSegment = '/data/some-id'

export const nestedCodeActionCreateData = (
  page: IPageDto,
): ICreateCodeActionData => ({
  code: `function run(firstArg, secondArg) { state.${stateKey1} = firstArg; state.${stateKey2} = secondArg; }`,
  id: v4(),
  name: nestedActionName,
  storeId: page.store.id,
  type: IActionKind.CodeAction,
})

export const onClickActionCreateData = (
  page: IPageDto,
): ICreateCodeActionData => ({
  code: `function run() { actions.${nestedActionName}('hey', 123); actions.${apiActionName}('yo', 456); }`,
  id: onClickActionId,
  name: 'onClick',
  storeId: page.store.id,
  type: IActionKind.CodeAction,
})

export const apiActionCreateData = (page: IPageDto): ICreateApiActionData => ({
  config: {
    data: {
      body: '{"firstArg": "{{args[0]}}", "secondArg": {{args[1]}}}',
      method: HttpMethod.POST,
      responseType: HttpResponseType.Text,
      urlSegment: apiUrlSegment,
    },
    id: v4(),
  },
  id: v4(),
  name: apiActionName,
  resource: createResourceData,
  storeId: page.store.id,
  type: IActionKind.ApiAction,
})

export const textElementCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Content',
  propsData: {
    children: `${stateKey1} - {{state.${stateKey1}}}, ${stateKey2} - {{state.${stateKey2}}}`,
  },
}

export const buttonElementCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Post Button',
  prevSibling: textElementCreateData,
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: systemTypesIds[ITypeKind.RichTextType],
      value: 'Click button to run actions',
    },
    onClick: {
      kind: ITypeKind.ActionType,
      type: actionTypeId,
      value: onClickActionId,
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
