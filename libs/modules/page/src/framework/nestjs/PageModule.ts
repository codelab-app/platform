import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
  imports: [CqrsModule],
  providers: [],
})
export class PageModule {}
