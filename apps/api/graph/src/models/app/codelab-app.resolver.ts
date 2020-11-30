import { Query, Resolver } from '@nestjs/graphql'
import { CodelabAppEntity } from './codelab-app.entity'
import { CodelabAppService } from './codelab-app.service'

@Resolver(() => CodelabAppEntity)
export class CodelabAppResolver {
  constructor(private codelabAppService: CodelabAppService) {}

  @Query(() => [CodelabAppEntity])
  async getAllApps() {
    return this.codelabAppService.findAll()
  }
}
