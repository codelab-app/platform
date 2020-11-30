import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageEntity } from './page.entity'
import { PageResolver } from './page.resolver'
import { PageService } from './page.service'

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  providers: [PageService, PageResolver],
  exports: [TypeOrmModule, PageService],
})
export class PageModule {}
