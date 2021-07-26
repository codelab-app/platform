import { Module } from '@nestjs/common'
import { LambdaResolver } from './lambda.resolver'
import { LambdaService } from './lambda.service'
import { CreateLambdaService } from './use-cases/create-lambda/create-lambda.service'
import { DeleteLambdaService } from './use-cases/delete-lambda'

const services = [CreateLambdaService, DeleteLambdaService]

@Module({
  controllers: [],
  providers: [LambdaResolver, LambdaService, ...services],
  exports: [...services],
})
export class LambdaModule {}
