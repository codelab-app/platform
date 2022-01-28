import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { UpdateTypeService } from '../update-type'
import { UpdateUnionRequest } from './update-union.request'

@Injectable()
export class UpdateUnionTypeService extends UpdateTypeService<UpdateUnionRequest> {
  protected override doUpdate(type: IType, request: UpdateUnionRequest): void {
    super.doUpdate(type, request)

    if (type.typeKind !== TypeKind.UnionType) {
      throw new Error('Type is not a union type')
    }

    const {
      input: { updateData },
    } = request

    type.typesOfUnionType = updateData.typeIdsOfUnionType.map((id) => ({ id }))
  }
}
