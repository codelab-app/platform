import type { TagState } from '../store/tagState'

declare module 'react-redux' {
  interface DefaultRootState {
    tag: TagState
  }
}
