import { Module } from '@nestjs/common'
import { LambdaController } from './Lambda.controller'
import { LambdaService } from './LambdaService'

@Module({
  controllers: [LambdaController],
  providers: [LambdaService],
  exports: [],
})
export class LambdaApiModule {}
