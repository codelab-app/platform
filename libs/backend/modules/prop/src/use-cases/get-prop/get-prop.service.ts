import { UseCasePort } from '@codelab/backend/abstract/core'
import { IProp } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { IPropRepository, IPropRepositoryToken } from '../../infrastructure'
import { GetPropRequest } from './get-prop.request'

@Injectable()
export class GetPropService
  implements UseCasePort<GetPropRequest, IProp | undefined>
{
  constructor(
    @Inject(IPropRepositoryToken)
    private readonly propsRepository: IPropRepository,
  ) {}

  execute({ input, transaction }: GetPropRequest): Promise<IProp | undefined> {
    return this.propsRepository.getOne(input.propId, transaction)
  }
}
