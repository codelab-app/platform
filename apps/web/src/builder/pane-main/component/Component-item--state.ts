import { atom } from 'recoil'

export interface ComponentItemStateType {
  isDraggingComponent: boolean
}

export const componentItemState = atom<ComponentItemStateType>({
  key: 'componentItemState',
  default: {
    isDraggingComponent: false,
  },
})
