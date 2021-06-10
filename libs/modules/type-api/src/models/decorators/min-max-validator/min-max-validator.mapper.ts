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
    const validator = new MinMaxValidator()

    validator.id = dgraphValidator[BaseDgraphFields.uid]
    validator.min = dgraphValidator[MinMaxValidatorDgraphFields.Min]
    validator.max = dgraphValidator[MinMaxValidatorDgraphFields.Max]

    minMaxValidatorSchema.parse(minMaxValidatorSchema)

    return validator
  }
}
