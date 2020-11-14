import { StateSchema, Typestate } from 'xstate'
import { ContextApp } from './machine-app--context'

export enum StateNameApp {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  CREATING = 'CREATING',
  EDITING = 'EDITING',
}

export interface StateSchemaApp<T = ContextApp> extends StateSchema<T> {
  states: {
    [StateNameApp.IDLE]: StateSchema<T>
    [StateNameApp.LOADING]: StateSchema<T>
    [StateNameApp.CREATING]: StateSchema<T>
    [StateNameApp.EDITING]: StateSchema<T>
  }
}

export interface StateApp extends Typestate<any> {
  value: StateNameApp
  context: ContextApp
}
