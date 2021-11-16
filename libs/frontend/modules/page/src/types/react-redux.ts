import type { PageState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    page: PageState
  }
}
