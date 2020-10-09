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
