import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  DgraphMinMaxValidator,
  MinMaxValidatorDgraphFields,
} from './dgraph-min-max-validator.model'
import {
  MinMaxValidator,
  minMaxValidatorSchema,
} from './min-max-validator.model'

@Injectable()
export class MinMaxValidatorMapper
  implements IDgraphMapper<DgraphMinMaxValidator, MinMaxValidator>
{
  map(input: DeepPartial<DgraphMinMaxValidator>) {
    const dgraphValidator = DgraphMinMaxValidator.Schema.parse(input)

    const validator = new MinMaxValidator(
      dgraphValidator[BaseDgraphFields.uid],
      dgraphValidator[MinMaxValidatorDgraphFields.Min] || null,
      dgraphValidator[MinMaxValidatorDgraphFields.Max] || null,
    )

    minMaxValidatorSchema.parse(minMaxValidatorSchema)

    return validator
  }
}
