import { atomFamily } from 'recoil'

export const stateAtomFamily = atomFamily<unknown, string>({
  default: undefined,
  key: 'stateElement',
})
