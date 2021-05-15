import { Module } from '@nestjs/common'
import { AwsModule, ConfigModule, LoggerModule } from '../../infrastructure'

@Module({
  imports: [
    LoggerModule.forRoot(),
    AwsModule,
    ConfigModule,
    // GraphqlModule,
  ],
})
export class InfrastructureModule {}
