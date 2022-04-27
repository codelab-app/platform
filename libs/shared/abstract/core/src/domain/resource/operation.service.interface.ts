import { OperationWhere } from '@codelab/shared/abstract/codegen'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import {
  ICreateOperationDTO,
  IUpdateOperationDTO,
} from './operation.dto.interface'
import { IOperation } from './operation.model.interface'

export interface IOperationModalProperties {
  operation: Nullable<IOperation>
}

export interface IOperationService
  extends ICRUDService<IOperation, ICreateOperationDTO, IUpdateOperationDTO>,
    Omit<IQueryService<IOperation, OperationWhere>, 'getOne'>,
    ICRUDModalService<Ref<IOperation>, IOperationModalProperties> {
  setSelectedOperations(operations: Array<Ref<IOperation>>): void
  operationList(resource: Nullish<string>): Array<IOperation>
}
