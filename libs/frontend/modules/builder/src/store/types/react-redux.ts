import type { BuilderState } from '../builderState'

declare module 'react-redux' {
  interface DefaultRootState {
    builder: BuilderState
  }
}
