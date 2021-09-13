import { Void } from '@codelab/backend/abstract/types'
import { awsConfig } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LambdaAdapter } from './application/lambda.adapter'
import { LambdaResolver } from './application/lambda.resolver'
import { LambdaService } from './application/lambda.service'
import { CreateLambdaService } from './use-cases/create-lambda'
import { DeleteLambdaService } from './use-cases/delete-lambda'
import { GetLambdaService } from './use-cases/get-lambda'
import { GetLambdasService } from './use-cases/get-lambdas'
import { UpdateLambdaService } from './use-cases/update-lambda'

const services = [
  /**
   * Use Cases
   */
  CreateLambdaService,
  DeleteLambdaService,
  UpdateLambdaService,
  GetLambdaService,
  GetLambdasService,
  /**
   * Adapters
   */
  LambdaAdapter,
]

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [Void, LambdaResolver, LambdaService, ...services],
  exports: [...services],
})
export class LambdaModule {}
