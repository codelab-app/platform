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
import { slugify } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { createResourceData } from '../store/resource.data'
import { elementFormName } from './elements.data'

export const apiPostActionId = v4()
export const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'

const apiPostActionName = 'On Submit'
const urlPostSegment = '/data'

export const createApiPostActionData = (
  page: IPageDto,
): ICreateApiActionData => ({
  config: {
    data: {
      body: `{{JSON.stringify(refs['${slugify(
        elementFormName,
      )}'].current.getFieldsValue())}}`,
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
