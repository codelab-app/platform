import type { PageState } from '../store/pageState'

declare module 'react-redux' {
  interface DefaultRootState {
    page: PageState
  }
}
