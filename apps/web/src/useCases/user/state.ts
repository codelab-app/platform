import { atom } from 'recoil'
import { User } from '@codelab/generated'

export interface UserState {
  loading: boolean
  modalVisible: undefined | false | 'login' | 'register'
  currentUser: undefined | Partial<User>
  initialCheckDone: boolean
}

export const initialUserState: UserState = {
  modalVisible: false,
  loading: false,
  currentUser: undefined,
  initialCheckDone: false,
}

export const userState = atom<UserState>({
  key: 'userState',
  default: initialUserState,
})
