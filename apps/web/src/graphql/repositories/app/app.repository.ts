import { PROVIDER_ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { App } from '../../model'
import {
  App as AppInput,
  CreateAppsMutationResponse,
} from '../../ogm-types.gen'
import exportApp from './exportApp.cypher'

export const appRepository = {
  exportApp: (txn: RxTransaction): Observable<Maybe<Array<AppInput>>> =>
    txn
      .run(exportApp)
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('vertices') as Maybe<Array<AppInput>>),
      ),
  importAppFromJson: async (
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
