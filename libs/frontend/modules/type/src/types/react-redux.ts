import { FieldState, TypeState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    type: TypeState
    field: FieldState
  }
}
