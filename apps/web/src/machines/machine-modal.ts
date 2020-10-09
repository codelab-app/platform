export const machineModal = {
  id: 'modal',
  states: {
    active: {
      on: {
        MODAL_TOGGLE: 'inactive',
      },
    },
    inactive: {
      on: {
        MODAL_TOGGLE: 'active',
      },
    },
  },
}
