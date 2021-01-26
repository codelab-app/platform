import { Module, Provider } from '@nestjs/common'

export const persistenceProviders: Array<Provider> = []

export const handlerProviders: Array<Provider> = []

const useCaseProviders: Array<Provider> = []

@Module({
  imports: [],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class EdgeModule {}
