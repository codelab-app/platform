import { UserState } from '../store/userState'

declare module 'react-redux' {
  interface DefaultRootState {
    user: UserState
  }
}
