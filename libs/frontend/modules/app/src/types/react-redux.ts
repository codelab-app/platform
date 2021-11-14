import type { AppState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    app: AppState
  }
}
