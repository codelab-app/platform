import { ValidationModule } from '@codelab/backend/infra/adapter/validation'
import { Module } from '@nestjs/common'

@Module({
  imports: [ValidationModule],
  providers: [],
})
export class SharedApplicationModule {}
