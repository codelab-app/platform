import { Machine, assign } from 'xstate'
import { ContextLayout } from './machine-layout--context'
import { EventLayout, EventNameLayout } from './machine-layout--event'
import {
  StateNameLayout,
  StateNameLayoutSidebar,
  StateSchemaLayout,
} from './machine-layout--state'

const initialContext = {
  sidebarCollapsed: false,
}

export const machineLayout = Machine<
  ContextLayout,
  StateSchemaLayout,
  EventLayout
>({
  id: 'Layout',
  type: 'parallel',
  context: initialContext,
  states: {
    [StateNameLayout.SIDEBAR]: {
      initial: StateNameLayoutSidebar.OPENED,
      states: {
        [StateNameLayoutSidebar.CLOSED]: {
          entry: assign<ContextLayout, EventLayout>({
            sidebarCollapsed: false,
          }),
          on: {
            [EventNameLayout.OPEN_SIDEBAR]: {
              target: StateNameLayoutSidebar.OPENED,
            },
          },
        },
        [StateNameLayoutSidebar.OPENED]: {
          entry: assign<ContextLayout, EventLayout>({
            sidebarCollapsed: true,
          }),
          on: {
            [EventNameLayout.CLOSE_SIDEBAR]: {
              target: StateNameLayoutSidebar.CLOSED,
            },
          },
        },
      },
    },
  },
})
