import type {
  IActionDto,
  ICreateActionData,
  IUpdateActionData,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'

export class ActionMapper {
  static mapDataToDto(data: ICreateActionData | IUpdateActionData): IActionDto {
    switch (data.type) {
      case IActionKind.CodeAction:
        return {
          ...data,
          __typename: IActionKind.CodeAction,
          store: { id: data.storeId },
        }

      case IActionKind.ApiAction:
        return {
          ...data,
          __typename: IActionKind.ApiAction,
          config: { data: JSON.stringify(data.config.data), id: data.id },
          errorAction: data.errorActionId
            ? { __typename: IActionKind.ApiAction, id: data.errorActionId }
            : undefined,
          resource: { id: data.resourceId },
          store: { id: data.storeId },
          successAction: data.successActionId
            ? { __typename: IActionKind.ApiAction, id: data.successActionId }
            : undefined,
        }
    }
  }
}
