import { Module } from '@nestjs/common'
import { NestedValidator } from '@codelab/shared/infra/validation'
import { ValidationService } from './validation.service'

@Module({
  providers: [
    {
      provide: NestedValidator,
      useClass: NestedValidator,
    },
    ValidationService,
  ],
  exports: [ValidationService, NestedValidator],
})
export class ValidationModule {}
