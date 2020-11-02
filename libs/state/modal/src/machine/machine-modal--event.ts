import { EventObject } from 'xstate'

export enum EventNameModal {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export interface EventModal extends EventObject {
  type: keyof typeof EventNameModal
}
