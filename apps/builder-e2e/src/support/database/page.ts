import {
  DEFAULT_GET_SERVER_SIDE_PROPS,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import type { PageCreateInput } from '@codelab/shared/abstract/codegen'
import merge from 'lodash/merge'
import { v4 } from 'uuid'

export const createPageInput = (
  appId: string,
  input: Partial<PageCreateInput> = {},
): PageCreateInput => {
  const id = v4()
  const rootId = v4()
  const name = 'Test Page'

  return merge(
    {
      id: id,
      name,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      rootElement: {
        create: {
          node: {
            id: rootId,
            name: ROOT_ELEMENT_NAME,
            slug: createSlug(ROOT_ELEMENT_NAME, id),
          },
        },
      },
      app: {
        connect: { where: { node: { id: appId } } },
      },
      slug: createSlug(name, appId),
      pageContainerElement: {
        connect: { where: { node: { id: rootId } } },
      },
    },
    input,
  )
}
