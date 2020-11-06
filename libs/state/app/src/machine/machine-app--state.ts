import { StateSchema, Typestate } from 'xstate'
import { ContextApp } from './machine-app--context'

export enum StateNameApp {
  INIT = 'INIT',
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  READY = 'READY',
}

export interface StateSchemaApp<T = ContextApp> extends StateSchema<T> {
  states: {
    [StateNameApp.INIT]: StateSchema<T>
    [StateNameApp.IDLE]: StateSchema<T>
    [StateNameApp.LOADING]: StateSchema<T>
    [StateNameApp.READY]: StateSchema<T>
  }
}

export interface StateApp extends Typestate<any> {
  value: StateNameApp
  context: ContextApp
}
