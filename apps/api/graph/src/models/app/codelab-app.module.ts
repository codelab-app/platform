import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CodelabAppEntity } from './codelab-app.entity'
import { CodelabAppResolver } from './codelab-app.resolver'
import { CodelabAppService } from './codelab-app.service'

@Module({
  imports: [TypeOrmModule.forFeature([CodelabAppEntity])],
  providers: [CodelabAppService, CodelabAppResolver],
  exports: [TypeOrmModule, CodelabAppService],
})
export class CodelabAppModule {}
