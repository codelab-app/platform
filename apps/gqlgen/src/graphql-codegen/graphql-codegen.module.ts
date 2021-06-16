import { Module } from '@nestjs/common'
import { GraphqlCodegenService } from './graphql-codegen.service'

@Module({
  providers: [GraphqlCodegenService],
  exports: [GraphqlCodegenService],
})
export class GraphqlCodegenModule {}
