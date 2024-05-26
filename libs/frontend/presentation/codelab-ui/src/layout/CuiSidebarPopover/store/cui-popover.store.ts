import { action, computed, makeAutoObservable, observable } from 'mobx'
import type { IPopoverStore } from './cui-popover.store.interface'

export class CuiPopoverStore implements IPopoverStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action
  close() {
    this.openPopoverId = undefined

    // Router.events.off('routeChangeStart', this.closeOnRouteChange)
  }

  @computed
  isAnyPopoverOpen() {
    return Boolean(this.openPopoverId)
  }

  @computed
  isOpen(id: string) {
    const val = this.openPopoverId === id

    return val
  }

  @action
  open(id: string) {
    this.openPopoverId = id

    // Router.events.on('routeChangeStart', this.closeOnRouteChange)
  }

  private closeOnRouteChange = () => this.close()

  @observable
  private openPopoverId: string | undefined
}
