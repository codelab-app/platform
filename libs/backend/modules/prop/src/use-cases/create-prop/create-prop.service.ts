import { CreateResponsePort, UseCasePort } from '@codelab/backend/abstract/core'
import { IProp, PropSchema } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { IPropRepository, IPropRepositoryToken } from '../../infrastructure'
import { CreatePropRequest } from './create-prop.request'

@Injectable()
export class CreatePropService
  implements UseCasePort<CreatePropRequest, CreateResponsePort>
{
  constructor(
    @Inject(IPropRepositoryToken)
    private readonly propsRepository: IPropRepository,
  ) {}

  async execute({
    input,
    transaction,
  }: CreatePropRequest): Promise<CreateResponsePort> {
    const inputProp: IProp = {
      id: '',
      data: input.data,
    }

    const prop = PropSchema.parse(inputProp)

    return this.propsRepository.create(prop, transaction)
  }
}
