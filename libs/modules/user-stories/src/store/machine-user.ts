import Router from 'next/router'
import { Machine, assign, sendParent } from 'xstate'
import { getMeServices } from '../useCases/getMe/GetMeServices'
import { loginUserState } from '../useCases/loginUser'
import { loginUserServices } from '../useCases/loginUser/LoginUserServices'
import {
  registerUserService,
  registerUserState,
} from '../useCases/registerUser'
import { clearAuthToken } from '@codelab/frontend'

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
                () => clearAuthToken(),
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
          entry: () => {
            // Redirect to /apps on login
            Router.push('/apps')
          },
          states: {
            idle: {
              on: {
                // We don't need a service, since the server is stateless and is not concerned with logging out
                // Just clear the authToken, clear the userData context and we're done
                SIGN_OUT: {
                  target: '#guest',
                  actions: [
                    // Clear the user data from context
                    assign({
                      userData: undefined,
                    }),
                    // Clear the auth token, so that we won't send it anymore with requests
                    () => clearAuthToken(),
                    // Notify the user that the operation was succesfull
                    sendParent({
                      type: 'NOTIFY',
                      title: 'You have been signed out',
                    }),
                    // Redirect to home page
                    () => Router.push('/'),
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
