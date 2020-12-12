import { mergeState } from './mergeState'

describe('Merge state', () => {
  it('merges 2 machine state configs', () => {
    const loginState = {
      idle: {
        on: {
          LOGIN: {},
        },
      },
      loggingIn: {
        on: {
          ON_MODAL_CANCEL: {},
        },
      },
    }

    const signupState = {
      idle: {
        on: {
          SIGN_UP: {},
        },
      },
      signingUp: {
        on: {
          ON_MODAL_CANCEL: {},
        },
      },
    }

    const expectedState: object = {
      idle: {
        on: {
          LOGIN: {},
          SIGN_UP: {},
        },
      },
      loggingIn: {
        on: {
          ON_MODAL_CANCEL: {},
        },
      },
      signingUp: {
        on: {
          ON_MODAL_CANCEL: {},
        },
      },
    }

    const mergedState: object = mergeState(loginState, signupState, ['idle'])

    expect(expectedState).toStrictEqual(mergedState)
  })
})
