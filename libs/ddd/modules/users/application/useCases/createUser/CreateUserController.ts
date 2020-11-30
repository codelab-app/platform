import * as express from 'express'
import { GraphqlController } from '../../../../../shared/infra/src/http/graphql/GraphqlController'
import { CreateUserDTO } from './CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController extends GraphqlController {
  private useCase: CreateUserUseCase

  constructor(useCase: CreateUserUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: any, res: express.Response): Promise<any> {
    let dto: CreateUserDTO = req.body as CreateUserDTO

    dto = {
      username: dto.username,
      email: dto.email,
      password: dto.password,
    }

    // try {
    //   const result = await this.useCase.execute(dto)

    //   if (result.isLeft()) {
    //     const error = result.value

    //     switch (error.constructor) {
    //       case CreateUserErrors.UsernameTakenError:
    //         return this.conflict(error.errorValue().message)
    //       case CreateUserErrors.EmailAlreadyExistsError:
    //         return this.conflict(error.errorValue().message)
    //       default:
    //         return this.fail(res, error.errorValue().message)
    //     }
    //   } else {
    //     return this.ok(res)
    //   }
    // } catch (err) {
    //   return this.fail(res, err)
    // }
  }
}
