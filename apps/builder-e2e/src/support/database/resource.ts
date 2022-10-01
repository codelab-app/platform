import {
  ResourceCreateInput,
  ResourceType,
} from '@codelab/shared/abstract/codegen'
import { IResourceDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { CreateResourcesDocument } from 'libs/frontend/domain/resource/src/graphql/resource.endpoints.graphql.gen'
import { v4 } from 'uuid'

const defaultInput: ResourceCreateInput = {
  id: v4(),
  name: 'countries',
  type: ResourceType.GraphQL,
  config: {
    create: {
      node: {
        data: JSON.stringify({ url: 'https://countries.trevorblades.com/' }),
      },
    },
  },
}

export const createResource = (input: ResourceCreateInput = defaultInput) =>
  cy
    .graphqlRequest({
      query: print(CreateResourcesDocument),
      variables: { input },
    })
    .then(
      (result) =>
        result.body.data?.createResources.resources as Array<IResourceDTO>,
    )
