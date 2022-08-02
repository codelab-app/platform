import { atom } from 'recoil'

/**
 * Whether mobile menu is open or not
 */
export const menuState = atom({
  key: 'menuState',
  default: false,
})
