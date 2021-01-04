import { Machine } from 'xstate'

export const createGridMachine = () => {
  // const guestStates = mergeState(userSignupState, userLoginState, ['idle'])

  return Machine({
    id: 'grid',
    initial: 'idle',
    context: {},
    states: {
      idle: {
        on: {
          DRAG_START: {
            target: 'dragging',
            actions: (_: any, event: any) => {
              const {
                data: [layout, oldItem, newItem],
              } = event

              console.log(oldItem, newItem)
              console.log('onDragStart')
            },
          },
          RESIZE_START: {
            target: 'resizing',
            actions: () => {
              console.log('onResize')
            },
          },
        },
      },
      dragging: {
        on: {
          DRAG: {
            actions: () => {
              console.log('onDrag')
            },
          },
          DRAG_STOP: {
            target: 'idle',
            actions: (_: any, event: any) => {
              const {
                data: [layout, oldItem, newItem],
              } = event

              console.log(oldItem, newItem)
              console.log('onDragStop')
            },
          },
        },
      },
      resizing: {
        on: {
          RESIZE: {
            actions: () => {
              console.log('onResize')
            },
          },
          RESIZE_STOP: {
            target: 'idle',
            actions: (_: any, event: any) => {
              const {
                data: [layout, oldItem, newItem],
              } = event

              console.log(oldItem, newItem)
              console.log('onResizeStop')
            },
          },
        },
      },
    },
  })
}
