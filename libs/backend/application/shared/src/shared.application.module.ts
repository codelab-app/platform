import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'

@Module({
  imports: [ValidationModule],
  providers: [],
})
export class SharedApplicationModule {}
