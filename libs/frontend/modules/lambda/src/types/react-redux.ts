import type { LambdaState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    lambda: LambdaState
  }
}
