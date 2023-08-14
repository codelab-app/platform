import { Global, Module } from '@nestjs/common'
import { AsyncLocalStorage } from 'async_hooks'

@Global()
@Module({
  exports: [AsyncLocalStorage],
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
})
export class AlsModule {}
