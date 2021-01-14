import { Machine } from 'xstate'

export const layoutMachine = Machine({
  id: 'layout',
  type: 'parallel',
  states: {
    drawer: {
      initial: 'inactive',
      states: {
        active: {
          on: {
            TOGGLE_DRAWER: 'inactive',
          },
        },
        inactive: {
          on: {
            TOGGLE_DRAWER: 'active',
          },
        },
      },
    },
    sidebar: {
      initial: 'active',
      states: {
        active: {
          on: {
            TOGGLE_SIDEBAR: 'inactive',
          },
        },
        inactive: {
          on: {
            TOGGLE_SIDEBAR: 'active',
          },
        },
      },
    },
    modal: {
      initial: 'inactive',
      states: {
        active: {
          on: {
            TOGGLE_MODAL: 'inactive',
          },
        },
        inactive: {
          on: {
            TOGGLE_MODAL: 'active',
          },
        },
      },
    },
  },
})
