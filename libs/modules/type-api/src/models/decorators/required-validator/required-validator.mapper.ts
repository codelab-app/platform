import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import {
  DgraphRequiredValidator,
  RequiredValidatorDgraphFields,
} from './dgraph-required-validator.model'
import {
  RequiredValidator,
  requiredValidatorSchema,
} from './required-validator.model'

@Injectable()
export class RequiredValidatorMapper
  implements IDgraphMapper<DgraphRequiredValidator, RequiredValidator>
{
  map(input: DeepPartial<DgraphRequiredValidator>) {
    const dgraphValidator = DgraphRequiredValidator.Schema.parse(input)

    const validator = new RequiredValidator(
      dgraphValidator[BaseDgraphFields.uid],
      dgraphValidator[RequiredValidatorDgraphFields.IsRequired],
    )

    requiredValidatorSchema.parse(validator)

    return validator
  }
}
