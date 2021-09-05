import { atom } from 'recoil'
import { LambdaFragment } from './graphql/Lambda.fragment.api.graphql.gen'

export type LambdaType = LambdaFragment

export interface LambdaState {
  loading: boolean
  modalVisible: boolean
  editingLambda: LambdaType | undefined
}

export const initialAppState: LambdaState = {
  modalVisible: false, // do we need this, can't we use crudModal?
  loading: false,
  editingLambda: undefined,
}

export const lambdaState = atom<LambdaState>({
  key: 'lambdaState',
  default: initialAppState,
})
