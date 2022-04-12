import { getTypeService } from '@codelab/frontend/modules/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import { OperationWhere } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { omit } from 'lodash'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { OperationFragment } from '../graphql/operation.fragment.graphql.gen'
import { CreateOperationInput, UpdateOperationInput } from '../use-cases'
import { operationApi } from './operation.api'
import { Operation } from './operation.model'
import { OperationModalService } from './operation-modal.service'

export type WithOperationService = {
  operationService: OperationService
}

@model('codelab/Operation')
export class OperationService extends Model({
  operations: prop(() => objectMap<Operation>()),

  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new OperationModalService({})),
  deleteModal: prop(() => new OperationModalService({})),
}) {
  operationList(resourceId: Nullish<string>) {
    return [...this.operations.values()].filter(
      (operation) => operation.id === resourceId,
    )
  }

  operation(id: string) {
    return this.operations.get(id)
  }

  @modelAction
  async fetchResource(resource: Array<OperationFragment['resource']>) {
    // loading api interface within operation fragment is hard so we load it separately
    return await getTypeService(this).getAll(resource.map((x) => x.id))
  }

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: OperationService,
    where: OperationWhere = {},
  ) {
    const { operations } = yield* _await(operationApi.GetOperations({ where }))
    const resources = operations.map((x) => x.resource)

    yield* _await(this.fetchResource(resources))

    const formattedOperations = operations.map((r) => Operation.fromFragment(r))

    formattedOperations.forEach((r) => {
      this.operations.set(r.id, r)
    })

    return formattedOperations
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: OperationService,
    input: CreateOperationInput,
    resourceId: Nullish<string>,
  ) {
    const {
      createOperations: { operations },
    } = yield* _await(
      operationApi.CreateOperations({
        input: {
          name: input.name,
          data: JSON.stringify(omit(input, ['type', 'name'])),
        },
      }),
    )

    const operation = operations[0]

    if (!operation) {
      throw new Error('Atom was not created')
    }

    const operationModel = Operation.fromFragment(operation)

    this.operations.set(operationModel.id, operationModel)

    return operations
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: OperationService,
    operation: Operation,
    input: UpdateOperationInput,
  ) {
    const { updateOperations } = yield* _await(
      operationApi.UpdateOperation({
        update: {
          name: input.name,
          data: JSON.stringify(omit(input, ['type', 'name'])),
        },
        where: { id: operation.id },
      }),
    )

    const updateOperation = updateOperations.operations[0]

    if (!updateOperation) {
      throw new Error('Failed to update operation')
    }

    const operationModel = Operation.fromFragment(updateOperation)

    this.operations.set(operation.id, operationModel)

    return operationModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: OperationService, id: string) {
    const { deleteOperations } = yield* _await(
      operationApi.DeleteOperations({ where: { id } }),
    )

    return deleteOperations
  })
}
