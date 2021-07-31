import { awsConfig, Void } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LambdaResolver } from './lambda.resolver'
import { LambdaService } from './lambda.service'
import { CreateLambdaService } from './use-cases/create-lambda/create-lambda.service'
import { DeleteLambdaService } from './use-cases/delete-lambda'
import { ExecuteLambdaService } from './use-cases/execute-lambda'
import { GetLambdaService } from './use-cases/get-lambda'
import { GetLambdasService } from './use-cases/get-lambdas'
import { UpdateLambdaService } from './use-cases/update-lambda/update-lambda.service'

const services = [
  CreateLambdaService,
  DeleteLambdaService,
  UpdateLambdaService,
  GetLambdaService,
  GetLambdasService,
  ExecuteLambdaService,
]

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [Void, LambdaResolver, LambdaService, ...services],
  exports: [...services],
})
export class LambdaModule {}
