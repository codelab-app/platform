export const guestStates = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        SIGN_UP: {
          target: 'signingUp',
          actions: () => {
            console.log('signing up')
          },
        },
        LOGIN: {
          target: 'loggingIn',
          actions: () => {
            console.log('logging in')
          },
        },
      },
    },
    signingUp: {
      on: {
        // Forwarded from app mediator
        ON_MODAL_CANCEL: {
          target: 'idle',
          actions: () => {
            console.log('cancel signup')
          },
        },
      },
    },
    loggingIn: {
      on: {
        // Forwarded from app mediator
        ON_MODAL_CANCEL: {
          target: 'idle',
          actions: () => {
            console.log('cancel logging in')
          },
        },
      },
    },
  },
}
