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
      ON_MODAL_OK: {
        actions: () => {
          console.log('signingUp on modal ok')
        },
      },
    },
  },
}
