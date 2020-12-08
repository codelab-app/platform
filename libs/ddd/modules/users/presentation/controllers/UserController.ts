import { Controller, Get } from '@nestjs/common'
import { UserEmail } from '../../core/domain/user-email'
import { UserPassword } from '../../core/domain/user-password'

@Controller('user')
export class UserController {
  @Get()
  public classToPlain() {
    const email = new UserEmail({ value: 'admin@codelab.ai' })
    const password = new UserPassword({ value: 'password' })
    // const user = new User({ email, password })

    // const serializedUser = classToPlain(user)

    // return serializedUser
  }
}
