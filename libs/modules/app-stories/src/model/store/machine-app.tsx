import { Machine, StateNodeConfig } from 'xstate'
import { createAppService } from '../../useCases/createApp/CreateAppService'
import { createAppState } from '../../useCases/createApp/CreateAppState'
import { deleteAppService } from '../../useCases/deleteApp/DeleteAppService'
import { deleteAppState } from '../../useCases/deleteApp/DeleteAppState'
import { getAppsService } from '../../useCases/getApps/GetAppsService'
import { getAppsState } from '../../useCases/getApps/GetAppsState'

const updateAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  states: {},
}

export const createAppMachine = () => {
  const services = {
    ...createAppService,
    ...getAppsService,
    ...deleteAppService,
  }

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
            ON_DELETE_APP: {
              target: 'deletingApp',
            },
          },
        },
        gettingApps: getAppsState,
        creatingApp: createAppState,
        deletingApp: deleteAppState,
        error: {
          on: {
            ON_GET_APPS: {
              target: 'gettingApps',
            },
          },
        },
        // updatingApp: updateAppState,
      },
    },
    {
      services,
    },
  )
}
