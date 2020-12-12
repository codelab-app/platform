import { EventObject } from 'xstate'

export enum EventNameLayout {
  OPEN_SIDEBAR = 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
}

export interface EventLayoutOpenSidebar extends EventObject {
  type: EventNameLayout.OPEN_SIDEBAR
}

export interface EventLayoutCloseSidebar extends EventObject {
  type: EventNameLayout.CLOSE_SIDEBAR
}

export type EventLayout = EventLayoutOpenSidebar | EventLayoutCloseSidebar
