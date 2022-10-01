import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { PageCreateInput, PageWhere } from '@codelab/shared/abstract/codegen'
import { IPageDTO } from '@codelab/shared/abstract/core'
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

export const createPageInput = (): PageCreateInput => ({
  id: v4(),
  name: 'Test Page',
  rootElement: { create: { node: { id: v4(), name: ROOT_ELEMENT_NAME } } },
  slug: 'test',
})

export const createPage = (input: Partial<PageCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreatePagesDocument),
      variables: { input: { ...createPageInput(), ...input } },
    })
    .then((result) => result.body.data?.createPages.pages as Array<IPageDTO>)
