import { EventObject } from 'xstate'

export enum EventNameUI {
  'OPEN_MODAL' = 'OPEN_MODAL',
  'CLOSE_MODAL' = 'CLOSE_MODAL',
  'OPEN_LEFT_PANEL' = 'OPEN_LEFT_PANEL',
  'CLOSE_LEFT_PANEL' = 'CLOSE_LEFT_PANEL',
}

export interface EventUI extends EventObject {
  type: keyof typeof EventNameUI
}
