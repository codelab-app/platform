import {
  CreateResponsePort,
  ITransaction,
  ITypeNeo4jRepository,
  ITypeNeo4jRepositoryToken,
  ITypeRepository,
  ITypeRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphCreateUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { Type } from '../../../domain'
import { TypeValidator } from '../../../domain/type.validator'
import { createType } from './create-type'
import { CreateTypeRequest } from './create-type.request'
import { CreateTypeInputFactory } from './create-type-input.factory'

/**
 * Depending on the type, we may assign a user to it. For example, primitive types are admin created & can only have 1 copy, so these aren't assigned users.
 *
 * But an interface created by a user should have an owner, while an interface created by admin shouldn't.
 *
 * TLDR: Admin created types don't have owners, while users do
 */
@Injectable()
export class CreateTypeService
  implements UseCasePort<CreateTypeRequest, CreateResponsePort>
{
  constructor(
    @Inject(ITypeNeo4jRepositoryToken)
    private typeRepository: ITypeNeo4jRepository,
  ) {}

  async execute(request: CreateTypeRequest) {
    const type = Type.create(request.input)
    const results = await this.typeRepository.save(type)

    return {
      id: '',
    }
  }

  // private async validate(
  //   request: CreateTypeRequest,
  //   txn: ITransaction,
  // ): Promise<void> {
  //   await this.typeValidator.validateCreateTypeInput(request.input, txn)
  //   await this.typeValidator.primitiveIsNotDuplicated(request, txn)
  // }
}
