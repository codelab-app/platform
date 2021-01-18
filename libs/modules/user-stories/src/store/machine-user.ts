import { Machine, assign, sendParent } from 'xstate'
import { getMeServices } from '../useCases/getMe'
import { loginUserState } from '../useCases/loginUser'
import { loginUserServices } from '../useCases/loginUser/LoginUserServices'
import {
  registerUserService,
  registerUserState,
} from '../useCases/registerUser'
import { clearAuthTokenInLocalStorage } from './userLocalStorage'

export const createUserMachine = () => {
  const services = {
    ...loginUserServices,
    ...registerUserService,
    ...getMeServices,
  }

  return Machine<any, any, any>(
    {
      id: 'user',
      initial: 'initialCheck',
      context: {
        // This is used to know: 1. Is the user authenticated? (!userData => not authenticated) and which user is authenticated (e.g. userData.email)
        userData: undefined,
      },
      states: {
        initialCheck: {
          invoke: {
            src: 'executeGetMe',
            onDone: {
              target: '#authenticated',
              actions: assign((context, { data }) => ({
                userData: data?.getMe,
              })),
            },
            onError: {
              target: '#guest',
              actions: [
                assign({
                  userData: undefined,
                }),
                () => clearAuthTokenInLocalStorage(),
              ],
            },
          },
        },
        guest: {
          id: 'guest',
          initial: 'idle',
          states: {
            idle: {
              id: 'userIdle',
              on: {
                REGISTER_USER: {
                  target: 'signingUp',
                },
                LOGIN: {
                  target: 'loggingIn',
                },
              },
            },
            signingUp: registerUserState,
            loggingIn: loginUserState,
          },
        },
        authenticated: {
          initial: 'idle',
          id: 'authenticated',
          states: {
            idle: {
              on: {
                SIGN_OUT: {
                  target: '#guest',
                  actions: [
                    assign({
                      userData: undefined,
                    }),
                    () => clearAuthTokenInLocalStorage(),
                    sendParent({
                      type: 'NOTIFY',
                      title: 'You have been signed out',
                    }),
                  ],
                },
              },
            },
          },
        },
      },
    },
    {
      services,
    },
  )
}
