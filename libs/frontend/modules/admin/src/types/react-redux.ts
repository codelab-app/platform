import type { AdminState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    admin: AdminState
  }
}
