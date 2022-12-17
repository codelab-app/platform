import type { ITagDTO } from '@codelab/frontend/abstract/core'
import type { TagCreateInput } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { CreateTagsDocument } from 'libs/frontend/domain/tag/src/graphql/tag.endpoints.graphql.gen'

export const createTag = (input: TagCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateTagsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createTags.tags as Array<ITagDTO>)
