import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'

@Module({
  imports: [ValidationModule, OtelModule],
  providers: [ValidationModule, OtelModule],
})
export class SharedApplicationModule {}
