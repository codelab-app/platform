export enum EventNameModal {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export type EventModal =
  | {
      type: EventNameModal.CLOSE
    }
  | {
      type: EventNameModal.OPEN
    }
