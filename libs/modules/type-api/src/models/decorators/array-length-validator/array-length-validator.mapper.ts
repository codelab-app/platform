import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  ArrayLengthValidator,
  arrayLengthValidatorSchema,
} from './array-length-validator.model'
import {
  ArrayLengthValidatorDgraphFields,
  DgraphArrayLengthValidator,
} from './dgraph-array-length-validator.model'

@Injectable()
export class ArrayLengthValidatorMapper
  implements IDgraphMapper<DgraphArrayLengthValidator, ArrayLengthValidator>
{
  map(input: DeepPartial<DgraphArrayLengthValidator>) {
    const dgraphValidator = DgraphArrayLengthValidator.Schema.parse(input)

    const validator = new ArrayLengthValidator(
      dgraphValidator[BaseDgraphFields.uid],
      dgraphValidator[ArrayLengthValidatorDgraphFields.Min] || null,
      dgraphValidator[ArrayLengthValidatorDgraphFields.Max] || null,
    )

    arrayLengthValidatorSchema.parse(validator)

    return validator
  }
}
