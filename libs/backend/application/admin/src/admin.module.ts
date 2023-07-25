import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'

@Module({
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
