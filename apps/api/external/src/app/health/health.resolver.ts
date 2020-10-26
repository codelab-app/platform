import { Query, Resolver } from '@nestjs/graphql'
import { HealthOutput } from './health.output'

@Resolver(() => HealthOutput)
export class HealthResolver {
  @Query((returns) => String, { name: 'ping' })
  async ping() {
    return 'ok'
  }
}
