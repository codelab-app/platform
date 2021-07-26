import { __LambdaFragment } from '@codelab/codegen/graphql'
import { atom } from 'recoil'

export type LambdaType = __LambdaFragment

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
