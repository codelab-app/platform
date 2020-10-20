import { EventObject } from 'xstate'

export enum EventNameModal {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export interface EventModalOpen extends EventObject {
  type: EventNameModal.OPEN
}

export interface EventModalClose extends EventObject {
  type: EventNameModal.CLOSE
}

export type EventModal = EventModalOpen | EventModalClose
