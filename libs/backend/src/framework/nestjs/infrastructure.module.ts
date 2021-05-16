import { Module } from '@nestjs/common'
import { AwsModule, DGraphModule, LoggerModule } from '../../infrastructure'

@Module({
  imports: [LoggerModule.forRoot(), AwsModule, DGraphModule],
})
export class InfrastructureModule {}
