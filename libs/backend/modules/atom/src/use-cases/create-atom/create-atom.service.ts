import {
  DgraphAtom,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { CreateTypeService } from '@codelab/backend/modules/type'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateAtomInput } from './create-atom.input'

@Injectable()
export class CreateAtomService extends DgraphCreateUseCase<CreateAtomInput> {
  constructor(
    dgraphRepository: DgraphRepository,
    private createTypeService: CreateTypeService,
  ) {
    super(dgraphRepository)
  }

  protected async executeTransaction(request: CreateAtomInput, txn: Txn) {
    const { type, name, api } = request
    // TODO: Validate api is a valid interfaceId
    let interfaceId = api

    if (!api) {
      const { id } = await this.createTypeService.execute({
        name: `${name} API`,
        typeKind: TypeKind.InterfaceType,
      })

      interfaceId = id
    }

    return this.dgraph.create(txn, (blankNodeUid) =>
      CreateAtomService.createMutation(
        { ...request, api: interfaceId },
        blankNodeUid,
      ),
    )
  }

  private static createMutation(
    { type, name, api }: CreateAtomInput,
    blankNodeUid: string,
  ) {
    return jsonMutation<DgraphAtom>({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      atomType: type,
      name,
      api,
    })
  }
}
