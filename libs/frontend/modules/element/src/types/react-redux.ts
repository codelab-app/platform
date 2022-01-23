import {
  ComponentState,
  ElementState,
  HookState,
  PropMapBindingState,
} from '../store'

declare module 'react-redux' {
  interface DefaultRootState {
    element: ElementState
    component: ComponentState
    hook: HookState
    propMapBinding: PropMapBindingState
  }
}
