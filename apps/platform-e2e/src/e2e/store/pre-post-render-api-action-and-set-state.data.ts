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
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { createResourceData } from '../preview/resource.data'

export const stateKeyPreRender = 'statePreRender'
export const stateKeyPostRender = 'statePostRender'
export const preRenderApiActionUrlSegment = '/data/pre-render'
export const postRenderApiActionUrlSegment = '/data/post-render'

export const preRenderCodeActionCreateData = (
  page: IPageDto,
): ICreateCodeActionData => ({
  code: `function run(response) { state.${stateKeyPreRender} = response.data; }`,
  id: 'pre-render-code-action-id',
  name: 'Store Pre Render Data',
  storeId: page.store.id,
  type: IActionKind.CodeAction,
})

export const preRenderApiActionCreateData = (
  page: IPageDto,
): ICreateApiActionData => ({
  config: {
    data: {
      method: HttpMethod.GET,
      responseType: HttpResponseType.Text,
      urlSegment: preRenderApiActionUrlSegment,
    },
    id: v4(),
  },
  id: 'pre-render-api-action-id',
  name: 'On Fetch Pre Render Data',
  resource: createResourceData,
  storeId: page.store.id,
  successActionId: 'pre-render-code-action-id',
  type: IActionKind.ApiAction,
})

export const postRenderCodeActionCreateData = (
  page: IPageDto,
): ICreateCodeActionData => ({
  code: `function run(response) { state.${stateKeyPostRender} = response.data; }`,
  id: 'post-render-code-action-id',
  name: 'Store Post Render Data',
  storeId: page.store.id,
  type: IActionKind.CodeAction,
})

export const postRenderApiActionCreateData = (
  page: IPageDto,
): ICreateApiActionData => ({
  config: {
    data: {
      method: HttpMethod.GET,
      responseType: HttpResponseType.Text,
      urlSegment: postRenderApiActionUrlSegment,
    },
    id: v4(),
  },
  id: 'post-render-api-action-id',
  name: 'On Fetch Post Render Data',
  resource: createResourceData,
  storeId: page.store.id,
  successActionId: 'post-render-code-action-id',
  type: IActionKind.ApiAction,
})

export const providerPageElement = (page: IPageDto): ICreateElementData => ({
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Typography Element',
  parentElement: page.rootElement,
  postRenderAction: { id: 'post-render-api-action-id' },
  preRenderAction: { id: 'pre-render-api-action-id' },
  propsData: {
    customText: `pre-render response: "{{state.${stateKeyPreRender}}}", post-render response: "{{state.${stateKeyPostRender}}}"`,
  },
})
