import { Module } from '@nestjs/common'
import { LambdaResolvers } from '../../presentation/controllers/LambdaResolvers'

@Module({
  providers: [LambdaResolvers],
})
export class LambdaModule {}
