import { atom } from 'recoil'

export const atomFormState = atom({
  key: 'atomForm',
  default: {
    visible: false,
  },
})
