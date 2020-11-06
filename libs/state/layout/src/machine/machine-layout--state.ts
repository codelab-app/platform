import { StateSchema } from 'xstate'
import { ContextLayout } from './machine-layout--context'

export enum StateNameLayout {
  SIDEBAR = 'SIDEBAR',
}

export enum StateNameLayoutSidebar {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}
export interface StateSchemaLayout<T = ContextLayout> extends StateSchema<T> {
  states: {
    [StateNameLayout.SIDEBAR]: {
      states: {
        [StateNameLayoutSidebar.OPENED]: StateSchema<T>
        [StateNameLayoutSidebar.CLOSED]: StateSchema<T>
      }
    }
  }
}
