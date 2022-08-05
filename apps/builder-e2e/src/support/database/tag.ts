import { TagCreateInput } from '@codelab/shared/abstract/codegen'
import { ITagDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { CreateTagsDocument } from '../../../../../libs/frontend/modules/tag/src/graphql/tag.endpoints.graphql.gen'

export const createTag = (input: TagCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateTagsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createTags.tags as Array<ITagDTO>)
