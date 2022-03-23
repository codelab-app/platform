import { AppService } from '@codelab/frontend/modules/app'
import { AtomStore } from '@codelab/frontend/modules/atom'
import { PageStore } from '@codelab/frontend/modules/page'
import { TypeStore } from '@codelab/frontend/modules/type'
import { fromSnapshot, Model, model, prop } from 'mobx-keystone'

@model('codelab/RootStore')
export class RootStore extends Model({
  appService: prop(() => new AppService({})),
  pageStore: prop(() => new PageStore({})),
  typeStore: prop(() => new TypeStore({})),
  atomStore: prop(() => new AtomStore({})),
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
