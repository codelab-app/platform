import { atom } from 'recoil'

export const pageFormState = atom({
  key: 'pageForm',
  default: {
    visible: false,
  },
})
