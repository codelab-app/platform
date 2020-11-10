import { EventObject } from 'xstate'

export enum EventNameModal {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  OK = 'OK',
}

export interface EventModal extends EventObject {
  type: keyof typeof EventNameModal
}
