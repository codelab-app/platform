import type { TagState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    tag: TagState
  }
}
