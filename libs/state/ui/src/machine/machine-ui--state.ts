// export enum StateNameIU {
//   'IDLE' = 'IDLE',
//   'MODAL_OPENED' = 'MODAL_OPENED',
//   'MODAL_CLOSED' = 'MODAL_CLOSED',
//   'LEFT_PANEL_OPENED' = 'LEFT_PANEL_OPENED',
//   'LEFT_PANEL_CLOSED' = 'LEFT_PANEL_CLOSED',
// }

// //TODO find out right types
// export interface StateSchemaUI {
//   states: {
//     [StateNameIU.IDLE]: object
//     [StateNameIU.MODAL_OPENED]: object
//     [StateNameIU.MODAL_CLOSED]: object
//     [StateNameIU.LEFT_PANEL_OPENED]: object
//     [StateNameIU.LEFT_PANEL_CLOSED]: object
//   }
// }

export enum StateNameIU {
  'MODAL' = 'MODAL',
  'LEFT_PANEL' = 'LEFT_PANEL',
}

// TODO find out right types
export interface StateSchemaUI {
  states: {
    [StateNameIU.MODAL]: object
    [StateNameIU.LEFT_PANEL]: object
  }
}

export enum StateNameIUModal {
  MODAL_OPENED = 'MODAL_OPENED',
  MODAL_CLOSED = 'MODAL_CLOSED',
}

export enum StateNameIULayout {
  'LEFT_PANEL_OPENED' = 'LEFT_PANEL_OPENED',
  'LEFT_PANEL_CLOSED' = 'LEFT_PANEL_CLOSED',
}
