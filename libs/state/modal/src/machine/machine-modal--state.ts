export enum StateNameModal {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export interface StateSchemaModal {
  states: {
    [StateNameModal.INACTIVE]: object
    [StateNameModal.ACTIVE]: object
  }
}
