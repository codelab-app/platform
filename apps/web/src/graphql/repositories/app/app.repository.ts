import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import { App } from '../../model'
import {
  App as AppInput,
  CreateAppsMutationResponse,
} from '../../ogm-types.gen'

export const appRepository = {
  getApp: async (): Promise<Array<AppInput>> => {
    const apps = (await App()).find()

    return apps
  },
  createApp: async (
    appInputs: Array<CreateAppInput>,
    auth0Id: string,
  ): Promise<Array<CreateAppsMutationResponse>> => {
    const allAppsPromises: Array<CreateAppsMutationResponse> =
      await Promise.all(
        appInputs.map(async (appInput) => {
          return (await App()).create({
            input: [
              {
                name: appInput.name,
                owner: { connect: [{ where: { node: { auth0Id } } }] },
                rootProviderElement: {
                  create: {
                    node: {
                      name: PROVIDER_ROOT_ELEMENT_NAME,
                    },
                  },
                },
              },
            ],
          })
        }),
      )

    return Promise.resolve(allAppsPromises)
  },
}
