import { ITagService } from '@codelab/shared/abstract/core'
import { createContext } from 'mobx-keystone'

export const tagServiceContext = createContext<ITagService>()

export const getTagService = (thisModel: any) => {
  const tagStore = tagServiceContext.get(thisModel)

  if (!tagStore) {
    throw new Error('tagServiceContext is not defined')
  }

  return tagStore
}
