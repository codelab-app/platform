import { ElementState } from '../use-cases/element/elementState'

declare module 'react-redux' {
  interface DefaultRootState {
    element: ElementState
  }
}
