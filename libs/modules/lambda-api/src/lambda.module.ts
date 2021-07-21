import { Module } from '@nestjs/common'
import { LambdaResolver } from './lambda.resolver'
import { CreateLambdaService } from './use-cases/create-lambda/create-lambda.service'

const services = [CreateLambdaService]

@Module({
  controllers: [],
  providers: [LambdaResolver, ...services],
  exports: [...services],
})
export class LambdaModule {}
