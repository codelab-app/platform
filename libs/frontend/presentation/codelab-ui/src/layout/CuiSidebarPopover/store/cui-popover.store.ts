import { action, computed, makeAutoObservable, observable } from 'mobx'
import type { IPopoverStore } from './cui-popover.store.interface'

export class CuiPopoverStore implements IPopoverStore {
  @observable
  private openPopoverId: string | undefined

  constructor() {
    makeAutoObservable(this)
  }

  @action
  open(id: string) {
    if (id === this.openPopoverId) {
      this.openPopoverId = undefined

      return
    }

    this.openPopoverId = id
  }

  @action
  close() {
    this.openPopoverId = undefined
  }

  @computed
  isOpen(id: string) {
    const val = this.openPopoverId === id

    return val
  }

  @computed
  isAnyPopoverOpen() {
    return Boolean(this.openPopoverId)
  }
}
