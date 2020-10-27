import { EventObject } from 'xstate'

export enum EventNameApp {
  FETCH_DATA = 'FETCH_DATA',
  CREATED_NODE = 'CREATED_NODE',
  EDITING_NODE = 'EDITING_NODE',
  EDITED_NODE = 'EDITED_NODE',
}

export interface EventApp extends EventObject {
  type: keyof typeof EventNameApp
  payload?: any // TODO: specify type
}
