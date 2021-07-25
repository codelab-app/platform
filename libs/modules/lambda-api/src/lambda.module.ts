import { Module } from '@nestjs/common'
import { LambdaController } from './lambda.controller'
import { LambdaResolver } from './lambda.resolver'
import { LambdaService } from './lambda.service'
import { CreateLambdaService } from './use-cases/create-lambda/create-lambda.service'

const services = [CreateLambdaService]

@Module({
  controllers: [LambdaController],
  providers: [LambdaResolver, LambdaService, ...services],
  exports: [...services],
})
export class LambdaModule {}
