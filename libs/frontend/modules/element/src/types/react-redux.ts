import { ElementState, HookState, PropMapBindingState } from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    element: ElementState
    hook: HookState
    propMapBinding: PropMapBindingState
  }
}
