import type { AtomState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    atom: AtomState
  }
}
