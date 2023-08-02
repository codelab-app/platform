import { DatabaseService } from '@codelab/backend/application/service'
import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'

@Module({
  controllers: [AdminController],
  providers: [DatabaseService],
})
export class AdminModule {}
