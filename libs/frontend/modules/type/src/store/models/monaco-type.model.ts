import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  IMonacoType,
  IMonacoTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { updateFromDTO } from '../abstract'
import { createTypeBase } from './base-type.model'

const hydrate = ({
  id,
  typeKind,
  name,
  language,
  owner,
}: IMonacoTypeDTO): MonacoType =>
  new MonacoType({
    id,
    typeKind,
    name,
    language,
    ownerAuth0Id: owner?.auth0Id,
  })

@model('@codelab/MonacoType')
export class MonacoType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.MonacoType),
    props: {
      language: prop<MonacoLanguage>(),
    },
  }))
  implements IMonacoType
{
  @modelAction
  updateCache(fragment: ITypeDTO): void {
    updateFromDTO(this, fragment)

    if (fragment.typeKind !== TypeKind.MonacoType) {
      return
    }

    this.language = fragment.language
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)

    if (!input.language) {
      throw new Error('MonacoType must have a language')
    }

    this.language = input.language
  }

  public static hydrate = hydrate
}
