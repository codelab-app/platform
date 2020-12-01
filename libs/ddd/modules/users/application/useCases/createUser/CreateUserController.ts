import { CreateUserDTO } from './CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'
import { GraphqlController, GraphqlRequest } from '@codelab/ddd/shared/infra'

export class CreateUserController extends GraphqlController {
  private useCase: CreateUserUseCase

  constructor(useCase: CreateUserUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: GraphqlRequest): Promise<any> {
    const dto: CreateUserDTO = req.arguments as CreateUserDTO

    console.log(dto)

    const result = await this.useCase.execute(dto)

    if (result.isLeft()) {
      const error = result.value

      // Do some extra error handling steps here

      return result
    }

    return result
  }
}
