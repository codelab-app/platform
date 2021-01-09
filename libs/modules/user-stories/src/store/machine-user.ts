import { Machine, assign } from 'xstate'
import { getMeServices } from '../useCases/getMe'
import {
  registerUserService,
  registerUserState,
} from '../useCases/registerUser'
import { userLoginState } from '../useCases/userLogin'
import { userLoginServices } from '../useCases/userLogin/UserLoginServices'
import { clearAuthTokenInLocalStorage } from './userLocalStorage'

export const createUserMachine = () => {
  const services = {
    ...userLoginServices,
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
              actions: assign((context, event) => {
                return {
                  userData: event.data?.data?.getMe,
                }
              }),
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
                SIGN_UP: {
                  target: 'signingUp',
                },
                LOGIN: {
                  target: 'loggingIn',
                },
              },
            },
            signingUp: registerUserState,
            loggingIn: userLoginState,
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
