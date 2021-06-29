import { DomainModule, InfrastructureModule } from '@codelab/framework/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [InfrastructureModule, DomainModule],
})
export class AppModule {}
