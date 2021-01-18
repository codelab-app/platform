import { Module } from '@nestjs/common'
import { HeroesGameModule } from '../heroes.module'

@Module({
  imports: [HeroesGameModule],
})
export class ApplicationModule {}
