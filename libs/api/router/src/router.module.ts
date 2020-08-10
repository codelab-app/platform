import { Module } from '@nestjs/common'
import { routerServiceProvider } from './router.provider'

@Module({
  providers: [routerServiceProvider],
})
export class RouterModule {}
