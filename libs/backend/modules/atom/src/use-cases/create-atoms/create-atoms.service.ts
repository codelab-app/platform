import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { Role, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateAtomsRequest } from './create-atoms.request'

@Injectable()
export class CreateAtomsService extends DgraphUseCase<
  CreateAtomsRequest,
  Array<CreateResponse>
> {
  constructor(dgraphRepository: DgraphRepository) {
    super(dgraphRepository)
  }

  protected async executeTransaction(
    request: CreateAtomsRequest,
    txn: Txn,
  ): Promise<Array<CreateResponse>> {
    // TODO: Validate api is a valid interfaceId
    const {
      input: { atoms },
      currentUser,
    } = request

    const blankUids: Array<string> = []

    const mutations = atoms.reduce((mutation, { type, name, api }, i) => {
      const blankUidLabel = `atom${i}`
      const apiUid = api ? `<${api}>` : `_:api${i}`

      blankUids.push(blankUidLabel)

      return `${mutation}
      _:${blankUidLabel} <dgraph.type> "${DgraphEntityType.Atom}" .
      _:${blankUidLabel} <atomType> "${type}" .
      _:${blankUidLabel} <name> "${name}" .
      _:${blankUidLabel} <api> ${apiUid} .
      ${
        api
          ? ''
          : `
      ${apiUid} <dgraph.type> "${DgraphEntityType.Type}" .
      ${apiUid} <name> "${name} API" .
      ${apiUid} <typeKind> "${TypeKind.InterfaceType}" .
      ${
        currentUser.roles.includes(Role.User)
          ? `
      ${apiUid} <owner> <${currentUser.id}> .
      `
          : ''
      }
      `
      }
      `
    }, '')

    const res = await txn.mutate({ setNquads: mutations })

    return blankUids.map((uid) => ({ id: this.dgraph.getUid(res, uid) }))
  }
}
