import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { UpdateTypeService } from '../update-type'
import { UpdatePrimitiveTypeRequest } from './update-primitive-type.request'

@Injectable()
export class UpdatePrimitiveTypeService extends UpdateTypeService<UpdatePrimitiveTypeRequest> {
  protected override doUpdate(
    type: IType,
    request: UpdatePrimitiveTypeRequest,
  ): void {
    super.doUpdate(type, request)

    if (type.typeKind !== TypeKind.PrimitiveType) {
      throw new Error('Type is not a primitive type')
    }

    const {
      input: { updateData },
    } = request

    type.primitiveKind = updateData.primitiveKind
  }
}
