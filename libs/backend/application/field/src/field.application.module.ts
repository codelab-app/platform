import { Module } from '@nestjs/common'
import { FieldApplicationController } from './field.application.controller'

@Module({
  controllers: [FieldApplicationController],
})
export class FieldApplicationModule {}
