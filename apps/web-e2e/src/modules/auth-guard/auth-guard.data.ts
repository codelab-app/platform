import type { IUserDto } from '@codelab/shared-abstract-core'
import type { APIRequestContext } from '@playwright/test'

import { ResourceType } from '@codelab/shared-infra-gqlgen'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { REQUEST_TIMEOUT } from '../../setup/config'

export const resourceName = 'Test Resource'

export const seedResourceData = async (request: APIRequestContext) => {
  const owner = await requestOrThrow<IUserDto>(request, 'user/me', {
    method: 'GET',
    timeout: REQUEST_TIMEOUT,
  })

  await requestOrThrow(request, 'resource/create-resource', {
    data: {
      config: {
        url: 'https://test.com',
      },
      id: v4(),
      name: resourceName,
      owner: { id: owner.id },
      type: ResourceType.Rest,
    },
    method: 'POST',
    timeout: REQUEST_TIMEOUT,
  })
}
