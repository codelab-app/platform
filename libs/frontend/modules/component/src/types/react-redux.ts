import { ComponentState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    component: ComponentState
  }
}
