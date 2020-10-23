import { EventObject } from 'xstate'

export enum EventNameApp {
  FETCH_DATA = 'FETCH_DATA',
  CREATE_NODE = 'CREATE_NODE',
}

export interface EventApp extends EventObject {
  type: keyof typeof EventNameApp
  payload?: any // TODO: specify type
}
