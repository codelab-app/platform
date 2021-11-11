import type { AppState } from '../store/appState'

declare module 'react-redux' {
  interface DefaultRootState {
    app: AppState
  }
}
