import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { PageCreateInput, PageWhere } from '@codelab/shared/abstract/codegen'
import { IPageDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { v4 } from 'uuid'
import {
  CreatePagesDocument,
  GetPagesDocument,
} from '../../../../../libs/frontend/modules/page/src/graphql'

export const getPages = (input: PageWhere) =>
  cy
    .graphqlRequest({
      query: print(GetPagesDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.pages as Array<IPageDTO>)

const defaultInput: PageCreateInput = {
  id: v4(),
  name: 'Test Page',
  rootElement: { create: { node: { id: v4(), name: ROOT_ELEMENT_NAME } } },
  slug: 'test',
}

export const createPage = (input: Partial<PageCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreatePagesDocument),
      variables: { input: { ...defaultInput, ...input } },
    })
    .then((result) => result.body.data?.createPages.pages as Array<IPageDTO>)
