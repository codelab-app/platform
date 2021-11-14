import { ComponentState } from '../store/componentState'
import { ElementState } from '../store/elementState'
import { HookState } from '../store/hookState'
import { PropMapBindingState } from '../store/propMapBindingState'

declare module 'react-redux' {
  interface DefaultRootState {
    element: ElementState
    component: ComponentState
    hook: HookState
    propMapBinding: PropMapBindingState
  }
}
