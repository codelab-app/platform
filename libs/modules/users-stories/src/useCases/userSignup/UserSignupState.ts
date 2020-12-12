export const userSignupState = {
  idle: {
    on: {
      SIGN_UP: {
        target: 'signingUp',
        actions: () => {
          console.log('signing up')
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
}
