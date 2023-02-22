import {
  DEFAULT_GET_SERVER_SIDE_PROPS,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { createUniqueName } from '@codelab/frontend/shared/utils'
import type { PageCreateInput } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { v4 } from 'uuid'

export const createPageInput = (
  appId: string,
  input: Partial<PageCreateInput> = {},
): PageCreateInput => {
  const id = v4()
  const rootId = v4()
  const name = `Test Page ${v4()}`

  return merge(
    {
      id: id,
      name: createUniqueName(name, appId),
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      rootElement: {
        create: {
          node: {
            id: rootId,
            name: createUniqueName(ROOT_ELEMENT_NAME, id),
          },
        },
      },
      kind: IPageKind.Regular,
      app: {
        connect: { where: { node: { id: appId } } },
      },
      pageContainerElement: {
        connect: { where: { node: { id: rootId } } },
      },
    },
    input,
  )
}
