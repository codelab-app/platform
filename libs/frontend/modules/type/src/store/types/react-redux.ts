import { FieldState } from '../fieldState'
import { TypeState } from '../typeState'

declare module 'react-redux' {
  interface DefaultRootState {
    type: TypeState
    field: FieldState
  }
}
