import { atomFamily } from 'recoil'

export const stateAtomFamily = atomFamily<any, any>({
  key: 'stateElement',
  default: {},
})
