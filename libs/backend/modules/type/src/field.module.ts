import { Module } from '@nestjs/common'
import { FieldAdapter } from './application/adapters'
import { FieldResolver } from './application/field.resolver'
import { FieldValidator } from './domain/field.validator'
import { TypeValidator } from './domain/type.validator'
import { TypeModule } from './type.module'
import { CreateFieldService } from './use-cases/field/create-field'
import { DeleteFieldService } from './use-cases/field/delete-field'
import { GetFieldService } from './use-cases/field/get-field'
import { UpdateFieldService } from './use-cases/field/update-field'

const services = [
  /**
   * Use Cases
   */
  CreateFieldService,
  DeleteFieldService,
  GetFieldService,
  UpdateFieldService,
  /**
   * Adapters
   */
  FieldAdapter,
  /**
   * Validators
   */
  FieldValidator,
  TypeValidator,
]

@Module({
  imports: [TypeModule],
  providers: [FieldResolver, ...services],
  exports: [...services],
})
export class FieldModule {}
