import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  IMonacoType,
  IMonacoTypeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
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

@model('codelab/MonacoType')
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
  updateFromFragment(fragment: ITypeDTO): void {
    baseUpdateFromFragment(this, fragment)

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

  public static fromFragment = fromFragment
}
