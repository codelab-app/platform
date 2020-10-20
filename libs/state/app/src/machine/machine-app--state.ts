import { StateSchema, Typestate } from 'xstate'
import { ContextApp } from './machine-app--context'

export enum StateNameApp {
  IDLE = 'IDLE',
}

export interface StateSchemaApp<T = ContextApp> extends StateSchema<T> {
  states: {
    [StateNameApp.IDLE]: StateSchema<T>
  }
}

export interface StateApp extends Typestate<any> {
  value: StateNameApp
  context: ContextApp
}
