import type { IPage, IPageCreateFormData } from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { requestOrThrow } from '../../api'
import { REQUEST_TIMEOUT } from '../../setup/config'

export const seedPageData = async (
  request: APIRequestContext,
  data: IPageCreateFormData,
) => {
  console.log('Seeding page data')

  return requestOrThrow<IPage>(request, '/api/v1/page/create', {
    data,
    timeout: REQUEST_TIMEOUT,
  })
}
