import { UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Interface, InterfaceMapper } from '../../../models'
import { GetInterfaceRequest } from '../get-interface'
import { GetRecursiveInterfaceService } from '../get-recursive-interface'

@Injectable()
/** Returns the interface in its recursive form */
export class GetInterfaceService
  implements UseCase<GetInterfaceRequest, Interface | null>
{
  constructor(
    private getRecursiveInterfaceService: GetRecursiveInterfaceService,
    private interfaceMapper: InterfaceMapper,
  ) {}

  async execute(request: GetInterfaceRequest): Promise<Interface | null> {
    const { interface: dgraphInterface } =
      await this.getRecursiveInterfaceService.execute(request)

    if (!dgraphInterface) {
      return null
    }

    return await this.interfaceMapper.map(dgraphInterface)
  }
}
