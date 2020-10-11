import { Typestate } from 'xstate'
import { ContextApp } from './machine-app--context'

export enum StateNameApp {
  INIT = 'INIT',
  LOADING = 'LOADING',
  READY = 'READY',
}

export interface StateSchemaApp {
  states: {
    [StateNameApp.INIT]: object
    [StateNameApp.LOADING]: object
    [StateNameApp.READY]: object
  }
}

export interface StateApp extends Typestate<any> {
  value: StateNameApp
  context: ContextApp
}
