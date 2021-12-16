import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { Role, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { UpsertAtomsRequest } from './upsert-atoms.request'

@Injectable()
/**
 * Each atom input gets either:
 *   - Updated if ID is provided. If api is provided too, it will get replaced. If it's not, it's left as it is
 *   - Created if ID is not provided. If api is provided, it  will get assigned. If it's not - an automatic one will get generated
 */
export class UpsertAtomsService extends DgraphUseCase<
  UpsertAtomsRequest,
  Array<CreateResponse>
> {
  protected async executeTransaction(
    request: UpsertAtomsRequest,
    txn: Txn,
  ): Promise<Array<CreateResponse>> {
    // TODO: Validate api is a valid interfaceId
    const {
      input: { atoms },
      currentUser,
    } = request

    const blankUids: Array<string> = []
    const uids: Array<string> = []

    const mutations = atoms.reduce((mutation, { type, name, api, id }, i) => {
      let apiUid

      if (api) {
        apiUid = `<${api}>`
      } else if (!id) {
        // Only create a new blank node if we're creating atom (ie no id)
        apiUid = `_:api${i}`
      }

      let atomId: string

      if (id) {
        // Update
        atomId = id
        uids.push(atomId)
      } else {
        // Create
        const blankUidLabel = `atom${i}`
        blankUids.push(blankUidLabel)
        atomId = `_:${blankUidLabel}`
      }

      return `
        ${mutation}
        ${atomId} <dgraph.type> "${DgraphEntityType.Atom}" .
        ${atomId} <atomType> "${type}" .
        ${atomId} <name> "${name}" .
        ${apiUid ? `${atomId} <api> ${apiUid} .` : ''}
        ${
          api
            ? ''
            : `
                  ${apiUid} <dgraph.type> "${DgraphEntityType.Type}" .
                  ${apiUid} <name> "${name} API" .
                  ${apiUid} <typeKind> "${TypeKind.InterfaceType}" .
                  ${
                    currentUser.roles.includes(Role.User)
                      ? `${apiUid} <owner> <${currentUser.id}> .`
                      : ''
                  }
              `
        }
      `
    }, '')

    const res = await txn.mutate({ setNquads: mutations })

    await txn.commit()

    return [
      ...blankUids.map((uid) => ({ id: DgraphRepository.getUid(res, uid) })),
      ...uids.map((uid) => ({ id: uid })),
    ]
  }
}
