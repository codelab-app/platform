import { atomFamily } from 'recoil'

export const stateAtomFamily = atomFamily<unknown, string>({
  key: 'stateElement',
  default: undefined,
})
