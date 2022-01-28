import { UseCasePort } from '@codelab/backend/abstract/core'
import { IEnumTypeValue, IType, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { UpdateTypeService } from '../update-type'
import { UpdateEnumTypeRequest } from './update-enum-type.request'

@Injectable()
export class UpdateEnumTypeService
  extends UpdateTypeService<UpdateEnumTypeRequest>
  implements UseCasePort<UpdateEnumTypeRequest, void>
{
  protected override doUpdate(
    type: IType,
    request: UpdateEnumTypeRequest,
  ): void {
    super.doUpdate(type, request)

    if (type.typeKind !== TypeKind.EnumType) {
      throw new Error('Type is not an enum')
    }

    const {
      input: { updateData },
    } = request

    type.allowedValues = updateData.allowedValues.map(
      (v, i) => ({ ...v, id: v.id ?? '', order: i } as IEnumTypeValue),
    )
  }
}
