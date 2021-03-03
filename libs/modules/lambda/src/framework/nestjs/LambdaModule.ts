import { Module } from '@nestjs/common'
import { CreateLambdaService } from '../../core/application/useCases/createLambda/CreateLambdaService'
import { DeleteLambdaService } from '../../core/application/useCases/deleteLambda/DeleteLambdaService'
import { GetLambdaService } from '../../core/application/useCases/getLambda/GetLambdaService'
import { GetLambdasService } from '../../core/application/useCases/getLambdas/GetLambdasService'
import { UpdateLambdaService } from '../../core/application/useCases/updateLambda/UpdateLambdaService'
import { LambdaResolvers } from '../../presentation/controllers/LambdaResolvers'

@Module({
  providers: [
    /**
     * Controllers
     */
    LambdaResolvers,
    /**
     * UseCaseProviders
     */
    CreateLambdaService,
    DeleteLambdaService,
    GetLambdaService,
    GetLambdasService,
    UpdateLambdaService,
  ],
})
export class LambdaModule {}
