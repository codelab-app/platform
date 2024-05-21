import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import {
  ICodeMirrorLanguage,
  type ICodeMirrorTypeDto,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const codeMirrorTypeFactory =
  (typeDomainService: ITypeDomainService) =>
  (dto: Partial<ICodeMirrorTypeDto>) => {
    const codeMirrorType: ICodeMirrorTypeDto = {
      __typename: TypeKind.CodeMirrorType as const,
      id: dto.id ?? v4(),
      kind: TypeKind.CodeMirrorType,
      language: dto.language ?? ICodeMirrorLanguage.Typescript,
      name: dto.name ?? 'codeMirrorType',
    }

    return typeDomainService.hydrate(codeMirrorType)
  }
