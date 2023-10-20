import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import { Module } from '@nestjs/common'
import { ValidationService } from './validator/validation.service'

@Module({
  exports: [ValidationService],
  imports: [OtelModule],
  providers: [ValidationService],
})
export class ValidationModule {}
