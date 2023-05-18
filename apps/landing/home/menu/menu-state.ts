import { atom } from 'recoil'

/**
 * Whether mobile menu is open or not
 */
export const menuState = atom({
  default: false,
  key: 'menuState',
})
