import type { ITagService } from '@codelab/frontend/abstract/application'
import { createContext } from 'mobx-keystone'

export const tagServiceContext = createContext<ITagService>()

export const getTagService = (self: object) => {
  const tagStore = tagServiceContext.get(self)

  if (!tagStore) {
    throw new Error('tagServiceContext is not defined')
  }

  return tagStore
}
