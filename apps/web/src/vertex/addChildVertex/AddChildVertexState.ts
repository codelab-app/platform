import { atom } from 'recoil'

export const addChildVertexState = atom({
  key: 'addChildVertex',
  default: {
    visible: false,
  },
})
