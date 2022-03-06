import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { PageCreateInput, PageWhere } from '@codelab/shared/abstract/codegen-v2'
import { IPage } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import {
  E2eCreatePageDocument,
  E2eGetPageDocument,
} from './graphql/page.api.v2.1.graphql.gen'

export const getPages = (input: PageWhere) =>
  cy
    .graphqlRequest({
      query: print(E2eGetPageDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.pages as Array<IPage>)

const defaultInput: PageCreateInput = {
  name: 'Test Page',
  rootElement: { create: { node: { name: ROOT_ELEMENT_NAME } } },
}

export const createPage = (input: Partial<PageCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(E2eCreatePageDocument),
      variables: { input: { ...defaultInput, ...input } },
    })
    .then((r) => r.body.data?.createPages.pages as Array<IPage>)
