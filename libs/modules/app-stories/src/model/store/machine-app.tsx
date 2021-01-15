import { Machine, assign } from 'xstate'
import { createAppService } from '../../useCases/createApp/CreateAppService'
import { createAppState } from '../../useCases/createApp/CreateAppState'
import { deleteAppService } from '../../useCases/deleteApp/DeleteAppService'
import { deleteAppState } from '../../useCases/deleteApp/DeleteAppState'
import { editAppService } from '../../useCases/editApp/EditAppService'
import { editAppState } from '../../useCases/editApp/EditAppState'
import { getAppsService } from '../../useCases/getApps/GetAppsService'
import { getAppsState } from '../../useCases/getApps/GetAppsState'

export const createAppMachine = () => {
  const services = {
    ...createAppService,
    ...getAppsService,
    ...deleteAppService,
    ...editAppService,
  }

  return Machine(
    {
      id: 'app',
      initial: 'idle',
      context: {
        apps: undefined,
        formData: {},
      },
      states: {
        idle: {
          entry: assign({ formData: {} }), // Empty out any form data we could have
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
            ON_EDIT_APP: {
              target: 'editingApp',
            },
          },
        },
        gettingApps: getAppsState,
        creatingApp: createAppState,
        deletingApp: deleteAppState,
        editingApp: editAppState,
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
