import { Machine, assign, spawn } from 'xstate'
import { machineModal } from './machine-modal'
import { machineNode } from './machine-node'

export enum AppStateName {
  INIT = 'INIT',
  LOADING = 'LOADING',
  READY = 'READY',
}

export interface AppContext {
  machineModalRef: any
  machineNodeRef: any
}

export interface AppStateSchema {
  states: {
    [AppStateName.INIT]: object
    [AppStateName.LOADING]: object
    [AppStateName.READY]: object
  }
}

export enum AppEventName {
  FETCH_DATA = 'FETCH_DATA',
}

export type AppEvent = { type: AppEventName.FETCH_DATA }

export const machineApp = Machine<AppContext, AppStateSchema, AppEvent>({
  id: 'app',
  initial: AppStateName.INIT,
  context: {
    machineModalRef: null,
    machineNodeRef: null,
  },
  states: {
    [AppStateName.INIT]: {
      entry: assign({
        machineModalRef: () => spawn(machineModal),
        machineNodeRef: () => spawn(machineNode),
      }),
      on: {
        '': {
          target: AppStateName.LOADING,
        },
      },
    },
    [AppStateName.LOADING]: {
      after: {
        1000: AppStateName.READY,
      },
    },
    [AppStateName.READY]: {},
  },
})
