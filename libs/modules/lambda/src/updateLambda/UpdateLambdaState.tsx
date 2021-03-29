import { atom } from 'recoil'

export const updateLambdaState = atom({
  key: 'updateLambda',
  default: {
    visible: false,
    lambdaId: '',
  },
})
