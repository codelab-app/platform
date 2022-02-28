import { types } from 'mobx-state-tree'

export const ModalStore = types
  .model({
    isOpen: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    open() {
      self.isOpen = true
    },
    close() {
      self.isOpen = false
    },
  }))
