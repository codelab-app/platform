import { AuthService, CurrentUser } from '@codelab/backend/application/shared'
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { UserRepository } from '@codelab/backend/domain/user'
import { AUTH0_MANAGEMENT_CLIENT_TOKEN } from '@codelab/backend/infra/adapter/auth0'
import {
  type Auth0IdToken,
  IAtomType,
  IRole,
  IUserDTO,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ManagementClient } from 'auth0'
import { v4 } from 'uuid'

@Controller('user')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private atomRepository: AtomRepository,
    private authService: AuthService,
  ) {}

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@Body() auth0IdToken: Auth0IdToken) {
    const { email, nickname: username, sub: auth0Id } = auth0IdToken
    const id = auth0IdToken[JWT_CLAIMS].neo4j_user_id
    const roles = auth0IdToken[JWT_CLAIMS].roles

    const user = await this.userRepository.save(
      {
        auth0Id,
        email,
        id,
        roles: roles.map((role) => IRole[role]),
        username,
      },
      {
        auth0Id,
      },
    )

    return user
  }

  /**
   * Setup new account. Used for development only, as production would already have those atoms setup
   *
   * - upsert user
   * - seed ReactFragment
   */
  @Post('setup')
  async setup() {
    const currentUser = this.authService.currentUser

    const user = await this.userRepository.save(currentUser, {
      auth0Id: currentUser.auth0Id,
    })

    const reactFragmentExists = await this.atomRepository.findOne({
      type: IAtomType.ReactFragment,
    })

    if (reactFragmentExists) {
      return user
    }

    // Seed atom manually for now, in future we will import
    const newInterfaceType = InterfaceType.createFromAtomName(
      IAtomType.ReactFragment,
    )

    const interfaceType = await this.interfaceTypeRepository.save(
      newInterfaceType,
    )

    const atom = Atom.create({
      api: interfaceType,
      id: v4(),
      name: IAtomType.ReactFragment,
      type: IAtomType.ReactFragment,
    })

    const results = await this.atomRepository.save(atom)

    console.log(results)

    return user
  }
}
