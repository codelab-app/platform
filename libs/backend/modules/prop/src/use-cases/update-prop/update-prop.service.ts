import { UseCasePort } from '@codelab/backend/abstract/core'
import { IProp, PropSchema } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { IPropRepository, IPropRepositoryToken } from '../../infrastructure'
import { UpdatePropRequest } from './update-prop.request'

@Injectable()
export class UpdatePropService implements UseCasePort<UpdatePropRequest, void> {
  constructor(
    @Inject(IPropRepositoryToken)
    private readonly propsRepository: IPropRepository,
  ) {}

  async execute({ input, transaction }: UpdatePropRequest): Promise<void> {
    const inputProp: IProp = { id: input.id, data: input.data }
    const prop = PropSchema.parse(inputProp)

    await this.propsRepository.update(prop, transaction)
  }
}
