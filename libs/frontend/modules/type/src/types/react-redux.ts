import { TypeState } from '../store/typeState'

declare module 'react-redux' {
  interface DefaultRootState {
    type: TypeState
  }
}
