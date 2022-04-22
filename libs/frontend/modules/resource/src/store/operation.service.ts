import { ModalService } from '@codelab/frontend/shared/utils'
import { OperationWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateOperationDTO,
  IOperationDTO,
  IUpdateOperationDTO,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  _async,
  _await,
  createContext,
  Model,
  model,
  modelAction,
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
      ? operations.filter((operation) => operation.resourceId === resourceId)
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
      this.operations.set(r.id, Operation.hydrate(r)),
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

    const operationModel = Operation.hydrate(operation)

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
    const { name, config, runOnInit } = input

    const { updateOperations } = yield* _await(
      operationApi.UpdateOperation({
        update: { name, config: JSON.stringify(config), runOnInit },
        where: { id: operation.id },
      }),
    )

    const updateOperation = updateOperations.operations[0]

    if (!updateOperation) {
      throw new Error('Failed to update operation')
    }

    const operationModel = Operation.hydrate(updateOperation)

    this.operations.set(operation.id, operationModel)

    return operationModel
  })

  @modelAction
  addOperation(operation: Operation) {
    this.operations.set(operation.id, operation)
  }

  @modelAction
  addOrUpdate(operation: IOperationDTO) {
    const existing = this.operation(operation.id)

    if (existing) {
      existing.name = operation.name
      existing.config = JSON.parse(operation.config)
      existing.resourceId = operation.resource.id
      existing.runOnInit = Boolean(operation.runOnInit)
    } else {
      this.addOperation(Operation.hydrate(operation))
    }
  }

  @modelAction
  updateCache(operations: Array<IOperationDTO>) {
    for (const operation of operations) {
      this.addOrUpdate(operation)
    }
  }

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

export const operationServiceContext = createContext<OperationService>()

export const getOperationService = (self: object) => {
  const operationStore = operationServiceContext.get(self)

  if (!operationStore) {
    throw new Error('OperationService context is not defined')
  }

  return operationStore
}
