import type { IRenderOutput } from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { tx } from '@twind/core'
import isNil from 'lodash/isNil'
import { Fragment } from 'react'
import { getAtom } from '../atoms'

export const getReactComponent = (renderOutput: IRenderOutput) => {
  // if component does not have atom assigned to the root element
  // use span to hold the component's elements together and it is an html
  // element with the least effect on its child and can be used for dnd
  const atomType =
    !renderOutput.atomType && renderOutput.props[DATA_COMPONENT_ID]
      ? IAtomType.HtmlSpan
      : renderOutput.atomType

  // Render the atom if it exists, otherwise use fragment
  return atomType ? getAtom(atomType) ?? Fragment : Fragment
}

export const generateTailwindClasses = (
  classNames: Nullable<Array<string>> | undefined,
  rendererType: RendererType,
) => {
  let classNamesToUse: Array<string> = classNames ?? []

  if (
    rendererType === RendererType.PageBuilder ||
    rendererType === RendererType.ComponentBuilder
  ) {
    classNamesToUse = replaceWithCustomResponsiveVariants(classNames ?? [])
  }

  if (classNamesToUse.length) {
    return tx(classNamesToUse.join(' '))
  }

  return ''
}

const replaceWithCustomResponsiveVariants = (classNames: Array<string>) => {
  /**
   * This function will append 'c' to all responsive variants like lg, sm, md, etc
   * We have custom responsive variants that goes by lgc, smc, mdc, etc
   * These custom variants use container query to simulate responsive css in builder mode
   */
  return classNames.map((className) => {
    return className.replace(/(lg|sm|md|xl|2xl):/g, '$1c:')
  })
}

export const makeOverrideAtomProps = (
  rendererType: RendererType,
  props: IPropData,
  atomType?: IAtomType,
): IPropData => {
  const inBuilderMode = [
    RendererType.PageBuilder,
    RendererType.ComponentBuilder,
  ].includes(rendererType)

  const builderOverrideProps: IPropData = {}

  // Disables any in-app navigation in builder mode
  if (inBuilderMode && !isNil(props['href'])) {
    builderOverrideProps['href'] = '#'
  }

  // Only allows editing of grid layout in preview mode
  if (atomType === IAtomType.GridLayout) {
    builderOverrideProps['static'] = !inBuilderMode
  }

  return builderOverrideProps
}
