import { Machine, StateNodeConfig } from 'xstate'
import { createAppService } from '../../useCases/createApp/CreateAppService'
import { createAppState } from '../../useCases/createApp/CreateAppState'
import { getAppsService } from '../../useCases/getApps/GetAppsService'
import { getAppsState } from '../../useCases/getApps/GetAppsState'

const updateAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  states: {},
}

export const createAppMachine = () => {
  const services = { ...createAppService, ...getAppsService }

  return Machine(
    {
      id: 'app',
      initial: 'idle',
      context: {
        apps: undefined,
      },
      states: {
        idle: {
          on: {
            ON_CREATE_APP: {
              target: 'creatingApp',
            },
            ON_GET_APPS: {
              target: 'gettingApps',
            },
          },
        },
        gettingApps: getAppsState,
        error: {
          on: {
            ON_GET_APPS: {
              target: 'gettingApps',
            },
          },
        },
        creatingApp: createAppState,
        // updatingApp: updateAppState,
      },
    },
    {
      services,
    },
  )
}
