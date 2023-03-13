import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { PageCreateInput } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { createUniqueName } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { v4 } from 'uuid'

export const createPageInput = (
  appId: string,
  input: Partial<PageCreateInput> = {},
): PageCreateInput => {
  const pageId = v4()
  const rootId = v4()
  const name = `Test Page`

  return merge(
    {
      _compoundName: createUniqueName(name, appId),
      app: {
        connect: { where: { node: { id: appId } } },
      },
      id: pageId,
      kind: IPageKind.Regular,
      pageContentContainer: {
        connect: { where: { node: { id: rootId } } },
      },
      rootElement: {
        create: {
          node: {
            id: rootId,
            name: ROOT_ELEMENT_NAME,
            props: {
              create: {
                node: {
                  data: '{}',
                  id: v4(),
                },
              },
            },
          },
        },
      },
    },
    input,
  )
}
