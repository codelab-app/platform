import { EventObject } from 'xstate'

export enum EventNameLayout {
  OPEN_SIDEBAR = 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
}

export interface EventLayout extends EventObject {
  type: keyof typeof EventNameLayout
}
