import { Module } from '@nestjs/common'
import { LambdaResolver } from './lambda.resolver'
import { LambdaService } from './lambda.service'
import { CreateLambdaService } from './use-cases/create-lambda/create-lambda.service'
import { DeleteLambdaService } from './use-cases/delete-lambda'
import { ExecuteLambdaService } from './use-cases/execute-lambda'
import { GetLambdaService } from './use-cases/get-lambda'
import { GetLambdasService } from './use-cases/get-lambdas'

const services = [
  CreateLambdaService,
  DeleteLambdaService,
  GetLambdaService,
  GetLambdasService,
  ExecuteLambdaService,
]

@Module({
  controllers: [],
  providers: [LambdaResolver, LambdaService, ...services],
  exports: [...services],
})
export class LambdaModule {}
