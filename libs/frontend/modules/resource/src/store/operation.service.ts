import { ModalService } from '@codelab/frontend/shared/utils'
import { OperationWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateOperationDTO,
  IUpdateOperationDTO,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  Ref,
  transaction,
} from 'mobx-keystone'
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
  selectedOperations: prop(() => Array<Ref<Operation>>()).withSetter(),
}) {
  operationList(resourceId: Nullish<string>) {
    const operations = [...this.operations.values()]

    return resourceId
      ? operations.filter(
          (operation) => operation.resource.current.id === resourceId,
        )
      : operations
  }

  operation(id: string) {
    return this.operations.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: OperationService, where?: OperationWhere) {
    const { operations } = yield* _await(operationApi.GetOperations({ where }))

    return operations.map((r) =>
      this.operations.set(r.id, Operation.fromFragment(r)),
    )
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: OperationService,
    input: ICreateOperationDTO,
    resourceId: Nullish<string>,
  ) {
    const { name, config } = input

    const {
      createOperations: { operations },
    } = yield* _await(
      operationApi.CreateOperations({
        input: {
          name,
          resource: { connect: { where: { node: { id: resourceId } } } },
          config: JSON.stringify(config),
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
    input: IUpdateOperationDTO,
  ) {
    const { name, config } = input

    const { updateOperations } = yield* _await(
      operationApi.UpdateOperation({
        update: { name, config: JSON.stringify(config) },
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
    if (this.operations.has(id)) {
      this.operations.delete(id)
    }

    const { deleteOperations } = yield* _await(
      operationApi.DeleteOperations({ where: { id } }),
    )

    return deleteOperations
  })
}
