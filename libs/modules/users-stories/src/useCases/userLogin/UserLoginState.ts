export const userLoginState = {
  idle: {
    on: {
      LOGIN: {
        target: 'loggingIn',
        actions: () => {
          console.log('logging in')
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
}
