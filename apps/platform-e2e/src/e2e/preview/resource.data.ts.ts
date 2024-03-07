import type {
  ICreateApiActionData,
  ICreateResourceData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

// TODO: this should be temporary, while we are not seeding the atom fields yet in the e2e tests
// because the workaround for now is to manually set props in the create form for the element
export const apiPostActionId = v4()

export const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'

export const resourceUrl = 'http://some-api.com/api'

const apiPostActionName = 'On Submit'
const resourceName = 'Api Resource'
const urlPostSegment = '/data'

export const createResourceData: ICreateResourceData = {
  config: { url: resourceUrl },
  id: v4(),
  name: resourceName,
  type: IResourceType.Rest,
}

export const createApiPostActionData = (
  page: IPageDto,
): ICreateApiActionData => ({
  config: {
    data: {
      body: "{{JSON.stringify(refs['form'].current.getFieldsValue())}}",
      method: HttpMethod.POST,
      responseType: HttpResponseType.Text,
      urlSegment: urlPostSegment,
    },
    id: v4(),
  },
  id: apiPostActionId,
  name: apiPostActionName,
  resource: { id: createResourceData.id },
  storeId: page.store.id,
  type: IActionKind.ApiAction,
})
