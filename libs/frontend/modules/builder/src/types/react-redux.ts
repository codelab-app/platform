import type { BuilderState } from '../store/builderState'

declare module 'react-redux' {
  interface DefaultRootState {
    builder: BuilderState
  }
}
