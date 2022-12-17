import type { IPageDTO } from '@codelab/frontend/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type {
  PageCreateInput,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { GetPagesDocument } from 'libs/frontend/domain/page/src/graphql'
import { v4 } from 'uuid'

export const getPages = (input: PageWhere) =>
  cy
    .graphqlRequest({
      query: print(GetPagesDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.pages as Array<IPageDTO>)

export const createPageInput = (appId: string): PageCreateInput => {
  const id = v4()

  return {
    id: id,
    name: 'Test Page',
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: ROOT_ELEMENT_NAME,
          slug: createSlug(ROOT_ELEMENT_NAME, id),
        },
      },
    },
    slug: createSlug('Test Page', appId),
  }
}

export const createPage = (input: Partial<PageCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreatePagesDocument),
      variables: { input: { ...createPageInput(), ...input } },
    })
    .then((result) => result.body.data?.createPages.pages as Array<IPageDTO>)
