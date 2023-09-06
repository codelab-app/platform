import { Module } from '@nestjs/common'
import { ValidationService } from './validator/validation.service'

@Module({
  exports: [ValidationService],
  providers: [ValidationService],
})
export class ValidationModule {}
