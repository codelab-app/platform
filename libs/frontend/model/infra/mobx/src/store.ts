import { AppService } from '@codelab/frontend/modules/app'
import { AtomService } from '@codelab/frontend/modules/atom'
import { PageService } from '@codelab/frontend/modules/page'
import { TypeService } from '@codelab/frontend/modules/type'
import { fromSnapshot, Model, model, prop } from 'mobx-keystone'

@model('codelab/RootStore')
export class RootStore extends Model({
  appService: prop(() => new AppService({})),
  pageService: prop(() => new PageService({})),
  typeService: prop(() => new TypeService({})),
  atomService: prop(() => new AtomService({})),
}) {}

let _store: RootStore | null = null

export const initializeStore = (snapshot: any = null) => {
  const store =
    _store ?? snapshot ? fromSnapshot<RootStore>(snapshot) : new RootStore({})

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return store
  }

  // Create the store once in the client
  if (!_store) {
    _store = store
  }

  return store
}
