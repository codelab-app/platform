import { Machine, assign } from 'xstate'
import { ContextLayout, ContextModal, ContextUI } from './machine-ui--context'
import { EventNameUI, EventUI } from './machine-ui--event'
import {
  StateNameIU,
  StateNameIULayout,
  StateNameIUModal,
  StateSchemaUI,
} from './machine-ui--state'

const defaultModalContext: ContextModal = {
  visible: false,
}

const defaultLayoutContext: ContextLayout = {
  sidebar: {
    collapsed: false,
  },
}

export const machineUI = Machine<ContextUI, StateSchemaUI, EventUI>({
  id: 'ui',
  type: 'parallel',
  // initial: StateNameIU.IDLE,
  context: {
    modal: defaultModalContext,
    layout: defaultLayoutContext,
  },
  states: {
    [StateNameIU.MODAL]: {
      initial: StateNameIUModal.MODAL_CLOSED,
      states: {
        [StateNameIUModal.MODAL_CLOSED]: {
          entry: assign({
            modal: {
              visible: false,
            },
          }),
          on: {
            [EventNameUI.OPEN_MODAL]: {
              target: StateNameIUModal.MODAL_OPENED,
            },
          },
        },
        [StateNameIUModal.MODAL_OPENED]: {
          entry: assign({
            modal: {
              visible: true,
            },
          }),
          on: {
            [EventNameUI.CLOSE_MODAL]: {
              target: StateNameIUModal.MODAL_CLOSED,
            },
          },
        },
      },
    } as any,
    [StateNameIU.LEFT_PANEL]: {
      initial: StateNameIULayout.LEFT_PANEL_OPENED,
      states: {
        [StateNameIULayout.LEFT_PANEL_OPENED]: {},
        [StateNameIULayout.LEFT_PANEL_CLOSED]: {},
      },
    } as any,
  },
})
