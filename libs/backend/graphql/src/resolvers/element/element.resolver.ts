import type { Element } from '@codelab/shared/abstract/codegen'
import { RenderTypeEnum } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import slugify from 'voca/slugify'

const renderType = ({
  id,
  __typename,
  renderAtomType,
  renderComponentType,
}: Pick<
  Element,
  'id' | 'renderAtomType' | 'renderComponentType' | '__typename'
>) => {
  if (!__typename) {
    return null
  }

  if (renderAtomType) {
    return {
      id,
      model: RenderTypeEnum.Component,
    }
  }

  if (renderComponentType) {
    return {
      id,
      model: RenderTypeEnum.Atom,
    }
  }

  return null
}

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    renderType,
  },
}
