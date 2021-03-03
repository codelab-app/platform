import { atom } from 'recoil'

export const createLambdaState = atom({
  key: 'createLambda',
  default: {
    visible: false,
  },
})
